import { useTheme } from "../context/ThemeContext";

const Marquee = () => {
  const { isDark } = useTheme();

  return (
    <div className="relative py-12 overflow-hidden">
      {/* Gradient overlays */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r ${
          isDark ? "from-[#141414] to-transparent" : "from-white to-transparent"
        } z-10`}
      ></div>
      <div
        className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l ${
          isDark ? "from-[#141414] to-transparent" : "from-white to-transparent"
        } z-10`}
      ></div>

      {/* Marquee content */}
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center mx-8">
            <span
              className={`${
                isDark ? "text-gray-500/50" : "text-gray-400/50"
              } mr-6 text-[8rem] font-bold`}
            >
              ✱{" "}
            </span>
            <span
              className={`text-[7rem] font-extrabold ${
                isDark ? "text-gray-500/50" : "text-gray-400/50"
              }`}
            >
              LET'S TALK
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
