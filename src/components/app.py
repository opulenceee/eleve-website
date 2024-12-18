from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import requests
from datetime import datetime, timezone
from werkzeug.utils import secure_filename
import logging

# Set up logging
logging.basicConfig(
    filename='app.log',
    level=logging.INFO,
    format='%(asctime)s %(levelname)s: %(message)s'
)

app = Flask(__name__)
CORS(app, origins=['https://eleve.space'])

# Configure maximum file size (50MB)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

MODEL_WEBHOOK_URL = os.getenv("MODEL_WEBHOOK_URL")
CLIENT_WEBHOOK_URL = os.getenv("CLIENT_WEBHOOK_URL")
CONTRACT_WEBHOOK_URL = os.getenv("CONTRACT_WEBHOOK_URL")

UPLOAD_FOLDER = 'uploads'
SUBMISSIONS_DIR = "submissions"
CONTRACTS_DIR = "contracts"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB in bytes


# Create directories and set permissions
for dir in [UPLOAD_FOLDER, SUBMISSIONS_DIR, CONTRACTS_DIR]:
    os.makedirs(dir, exist_ok=True)
    os.chmod(dir, 0o755)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def check_file_size(file):
    file.seek(0, os.SEEK_END)
    size = file.tell()
    file.seek(0)
    return size <= MAX_FILE_SIZE

def format_model_embed(data):
    # Check if attachment exists
    has_image = data.get("attachment") is not None
    image_status = "✅ Image Attached" if has_image else "❌ No Image"
    
    return {
        "embeds": [{
            "title": "🍑 New Model Application",
            "description": "A new model has submitted an application!",
            "color": 38655,
            "fields": [
                {"name": "Name", "value": data.get("name", "N/A"), "inline": True},
                {"name": "Age", "value": data.get("age", "N/A"), "inline": True},
                {"name": "Phone", "value": data.get("phone", "N/A"), "inline": True},
                {"name": "Work Type", "value": data.get("workType", "N/A"), "inline": True},
                {"name": "Facebrowser", "value": data.get("facebrowser", "N/A"), "inline": True},
                {"name": "Measurements", "value": data.get("measurements", "N/A"), "inline": True},
                {"name": "Image", "value": image_status, "inline": True}
            ],
            "footer": {"text": "Elevé Model Management"},
            "timestamp": datetime.now(timezone.utc).isoformat()
        }]
    }

def format_client_embed(data):
    return {
        "embeds": [{
            "title": "💼 New Client Inquiry",
            "description": "A potential client has reached out!",
            "color": 38655,
            "fields": [
                {"name": "Name", "value": data.get("name", "N/A"), "inline": True},
                {"name": "Company", "value": data.get("venueName", "N/A"), "inline": True},
                {"name": "Phone", "value": data.get("phone", "N/A"), "inline": True}
            ],
            "footer": {"text": "Elevé Model Management"},
            "timestamp": datetime.now(timezone.utc).isoformat()
        }]
    }

def format_contract_embed(data):
    return {
        "embeds": [{
            "title": "📝 Contract Signed",
            "description": "A model has signed their contract!",
            "color": 38655,
            "fields": [
                {"name": "Model Name", "value": data.get("name", "N/A"), "inline": True},
                {"name": "Date Signed", "value": data.get("dateSigned", "N/A"), "inline": True},
                {"name": "Username", "value": data.get("username", "N/A"), "inline": True}
            ],
            "footer": {"text": "Elevé Model Management"},
            "timestamp": datetime.now(timezone.utc).isoformat()
        }]
    }

@app.route('/submit-form', methods=['POST'])
def submit_form():
    try:
        data = request.form.to_dict()
        submission_type = data.get("submissionType", "")
        timestamp = datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')

        # Make image optional
        if 'attachment' in request.files:
            file = request.files['attachment']
            if file and allowed_file(file.filename):
                if not check_file_size(file):
                    return jsonify({
                        "message": "File size exceeds maximum limit of 16MB.",
                        "status": "error"
                    }), 413
                filename = secure_filename(file.filename)
                file_path = os.path.join(UPLOAD_FOLDER, f"{filename}_{timestamp}")
                file.save(file_path)
                data["attachment"] = file_path
            else:
                return jsonify({"message": "Invalid file type.", "status": "error"}), 400
        else:
            data["attachment"] = None

        if submission_type == "Contract":
            username = secure_filename(data.get("username", "unknown"))
            file_path = os.path.join(CONTRACTS_DIR, f"{username}_contract_{timestamp}.json")
            webhook_url = CONTRACT_WEBHOOK_URL
            embed = format_contract_embed(data)
        else:
            user_type = data.get("userType", "").capitalize()
            if user_type not in ["Client", "Model"]:
                logging.error(f"Invalid user type specified: {user_type}")
                return jsonify({"message": "Invalid user type specified.", "status": "error"}), 400
                
            name = secure_filename(data.get("name", "unknown"))
            file_path = os.path.join(SUBMISSIONS_DIR, f"{name}_{timestamp}.json")
            webhook_url = MODEL_WEBHOOK_URL if user_type == "Model" else CLIENT_WEBHOOK_URL
            embed = format_model_embed(data) if user_type == "Model" else format_client_embed(data)

        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2)

        response = requests.post(webhook_url, json=embed)
        
        if response.status_code == 204:
            message = "Contract signed successfully!" if submission_type == "Contract" else "Form submitted successfully!"
            logging.info(f"Successful submission: {message}")
            return jsonify({"message": message, "status": "success"}), 200
        else:
            error_msg = f"Discord webhook error: {response.status_code} - {response.text}"
            logging.error(error_msg)
            return jsonify({"message": "Submission saved but notification failed.", "status": "partial_success"}), 207

    except Exception as e:
        error_msg = f"Error processing submission: {str(e)}"
        logging.error(error_msg)
        return jsonify({
            "message": "An error occurred while processing your submission.",
            "status": "error",
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)