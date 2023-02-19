import React from "react";
// Define the props that the component will receive, including an optional color and a style
interface LoadingDotsProps {
  color?: string;
  style?: "small" | "large";
}
// Define the component as a functional component
const LoadingDots: React.FC<LoadingDotsProps> = ({
  color = "#000",
  style = "small",
}) => {
  const dotSize = style === "small" ? "h-2 w-2" : "h-3 w-3";
  const dotMargin = style === "small" ? "mx-1" : "mx-1.5";
  // Return a series of span elements representing the loading dots, with their size, margin, color, and animation class set using the props and styles
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
// Set a default style for the component
LoadingDots.defaultProps = {
  style: "small",
};
// Export the component as the default export of the module
export default LoadingDots;
