import { IoMenu } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="flex justify-end sticky top-0 z-50">
      <ul className="hidden md:flex gap-12 [&>li]:cursor-pointer">
        <li>Home</li>
        <li>Library</li>
        <li>Quiz</li>
      </ul>
      <button className="md:hidden">
        <IoMenu size={40} />
      </button>
    </nav>
  );
}
