"use client";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <nav
        className={`md:hidden fixed top-0 right-0 z-50 h-screen w-1/2 px-4 py-4 bg-linear-to-b from-blue-300 to-blue-400 backdrop-blur-sm shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 mt-8 font-bold text-xl text-gray-50 [&>li]:py-2 [&>li]:px-2">
          <li>
            <Link href="/" onClick={onClose}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/library" onClick={onClose}>
              Library
            </Link>
          </li>
          <li>
            <Link href="/quiz" onClick={onClose}>
              Quiz
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/10 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
    </>
  );
}
