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
        className={`sidebar ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
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
