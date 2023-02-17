import React from "react";

interface LoadingDotsProps {
  color?: string;
  style?: "small" | "large";
}

const LoadingDots: React.FC<LoadingDotsProps> = ({
  color = "#000",
  style = "small",
}) => {
  const dotSize = style === "small" ? "h-2 w-2" : "h-3 w-3";
  const dotMargin = style === "small" ? "mx-1" : "mx-1.5";

  return (
    <span className="inline-flex items-center">
      <span
        className={`${dotSize} ${dotMargin} rounded-full bg-${color} animate-bounce`}
      />
      <span
        className={`${dotSize} ${dotMargin} rounded-full bg-${color} animate-bounce`}
      />
      <span
        className={`${dotSize} ${dotMargin} rounded-full bg-${color} animate-bounce`}
      />
      <span
        className={`${dotSize} ${dotMargin} rounded-full bg-${color} animate-bounce`}
      />
      <span
        className={`${dotSize} ${dotMargin} rounded-full bg-${color} animate-bounce`}
      />
      <span
        className={`${dotSize} ${dotMargin} rounded-full bg-${color} animate-bounce`}
      />
    </span>
  );
};

LoadingDots.defaultProps = {
  style: "small",
};

export default LoadingDots;
