import SocialIcon from "./SocialIcon";
// Define a function that returns the current year
const currentYear = (): number => {
  const date = new Date();
  return date.getFullYear();
};
// Define a function component that returns a link to the author's website
function Copyright() {
  return (
    <a
      href="https://llego.dev/"
      target="_blank"
      rel="noreferrer"
      className="font-bold underline-offset-2 transition hover:underline"
      aria-label="Visit Mark Anthony Llego's website"
    >
      Mark Anthony Llego
    </a>
  );
}
// Define a function component that returns a link to the author's Twitter profile with a Twitter icon
function TwitterLink() {
  return (
    <a
      href="/twitter"
      target="_blank"
      rel="preconnect noopener noreferrer"
      className="group"
      aria-label="Visit Mark Anthony Llego's Twitter profile"
      aria-describedby="twitter-link"
    >
      <SocialIcon platform="twitter" size={25} />
    </a>
  );
}
// Define the Footer component as a function component
export default function Footer() {
  // Return a footer element with a copyright notice and a Twitter link with icon
  return (
    <footer className="mt-5 mb-3 flex h-16 w-full flex-col items-center justify-between space-y-2 border-t px-3 pt-4 text-center sm:mb-0 sm:h-20 sm:flex-row sm:pt-2">
      <div>
        Copyright © {currentYear()} <Copyright />
      </div>
      <div className="flex space-x-3 sm:space-x-4">
        <TwitterLink />
      </div>
    </footer>
  );
}
