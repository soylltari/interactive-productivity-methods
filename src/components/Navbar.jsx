import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  return (
    <nav className="flex justify-end sticky top-0 z-50 py-4">
      <ul className="hidden md:flex gap-12 [&>li]:hover:text-blue-500 [&>li]:transition-colors">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/library">Library</Link>
        </li>
        <li>
          <Link to="/quiz">Quiz</Link>
        </li>
      </ul>
      <button className="md:hidden" onClick={onMenuClick}>
        <IoMenu size={40} />
      </button>
    </nav>
  );
}
