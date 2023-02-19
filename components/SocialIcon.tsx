import GithubIcon from "./GitHub";
import TwitterIcon from "./Twitter";
// Declare the type for the props that the component will receive, including a platform and a size
type SocialIconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
  platform: "twitter" | "github";
  size?: number;
};
// Define the component as a functional component
const SocialIcon: React.FC<SocialIconProps> = ({
  className,
  platform,
  size = 20,
  ...rest
}) => {
  // Set the CSS classes for the SVG element using the provided className and the default fill color
  const svgClasses = `fill-slate-700 ${className ?? ""}`;
  // Use a switch statement to determine which platform to render, and return the appropriate SVG element
  switch (platform) {
    case "twitter":
      return (
        <TwitterIcon
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          fill="currentColor"
          viewBox="0 0 24 24"
          className={svgClasses.trim()}
          {...rest}
        />
      );
    case "github":
      return (
        <GithubIcon
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          fill="currentColor"
          viewBox="0 0 24 24"
          className={svgClasses.trim()}
          {...rest}
        />
      );
    default:
      return null;
  }
};
// Export the component as the default export of the module
export default SocialIcon;
