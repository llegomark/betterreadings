import GithubIcon from "./GitHub";
import TwitterIcon from "./Twitter";

type SocialIconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
  platform: "twitter" | "github";
  size?: number;
};

const SocialIcon: React.FC<SocialIconProps> = ({
  className,
  platform,
  size = 20,
  ...rest
}) => {
  const svgClasses = `fill-slate-700 ${className ?? ""}`;

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

export default SocialIcon;
