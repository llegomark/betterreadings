import Image from "next/image";

type HeaderProps = {
  href: string;
};

export default function Header({ href }: HeaderProps) {
  return (
    <header className="mt-5 flex w-full items-center justify-between border-b-2 px-2 pb-7 sm:px-4">
      <a className="flex w-full justify-center sm:justify-start" href={href}>
        <Image
          alt="Better Readings Logo"
          src="/betterreading.svg"
          className="h-12 w-12 object-cover"
          width={36}
          height={36}
          aria-label="Better Readings Logo"
        />
        <h1 className="ml-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Better Readings
        </h1>
      </a>
    </header>
  );
}
