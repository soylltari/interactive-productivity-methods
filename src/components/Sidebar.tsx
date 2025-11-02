import React, { useEffect } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: NavbarProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <nav
      id="sidebar"
      className={`md:hidden fixed top-0 right-0 z-50 h-screen w-1/2 px-4 py-4 bg-gradient-to-b from-blue-300 to-blue-400 backdrop-blur-sm shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <ul className="flex flex-col gap-6 mt-8 font-bold text-xl text-gray-50 [&>li]:py-2 [&>li]:px-2">
        <li>
          <Link to="/" onClick={onClose}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/library" onClick={onClose}>
            Library
          </Link>
        </li>
        <li>
          <Link to="/quiz" onClick={onClose}>
            Quiz
          </Link>
        </li>
      </ul>
    </nav>
  );
}
