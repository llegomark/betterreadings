import Link from "next/link";
import SocialIcon from "./SocialIcon";

const currentYear = (): number => {
  const date = new Date();
  return date.getFullYear();
};

export default function Footer() {
  return (
    <footer className="mt-5 mb-3 flex h-16 w-full flex-col items-center justify-between space-y-2 border-t px-3 pt-4 text-center sm:mb-0 sm:h-20 sm:flex-row sm:pt-2">
      <div>
        Copyright © {currentYear()}{" "}
        <Link
          href="https://llego.dev/"
          className="font-bold underline-offset-2 transition hover:underline"
        >
          Mark Anthony Llego
        </Link>
      </div>
      <div className="flex space-x-3 sm:space-x-4">
        <Link
          href="/twitter"
          target={"_blank"}
          rel="noopener noreferrer"
          className="group"
          aria-label="Mark Anthony Llego on Twitter"
        >
          <SocialIcon platform="twitter" size={25} />
        </Link>
      </div>
    </footer>
  );
}
