interface AdBannerProps {
  size?: "leaderboard" | "rectangle" | "mobile";
  className?: string;
  label?: string;
}

export function AdBanner({ size = "leaderboard", className = "", label = "Advertisement" }: AdBannerProps) {
  const sizeClasses = {
    leaderboard: "h-[90px] md:h-[90px]",
    rectangle: "h-[250px] w-[300px]",
    mobile: "h-[50px]",
  };

  return (
    <div
      data-ad="adsense"
      className={`w-full flex items-center justify-center bg-gray-100 border border-gray-200 rounded ${sizeClasses[size]} ${className}`}
    >
      <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">{label}</span>
    </div>
  );
}
