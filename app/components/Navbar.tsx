import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav
      className="flex justify-end sticky top-0 z-50 py-4"
      aria-label="Main Navigation"
    >
      <ul className="hidden md:flex gap-12 [&>li]:hover:text-blue-500 [&>li]:transition-colors">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/library">Library</Link>
        </li>
        <li>
          <Link href="/quiz">Quiz</Link>
        </li>
      </ul>
      <button
        className="md:hidden"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Image
          src="/assets/burger-menu.svg"
          alt=""
          width={35}
          height={35}
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}
