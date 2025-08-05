import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="md:hidden fixed top-0 right-0 z-50 h-screen w-1/2 px-4 py-4 bg-gradient-to-b from-blue-300 to-blue-400 backdrop-blur-sm shadow-xl">
      <ul className="flex flex-col gap-6 mt-8 font-bold text-xl text-gray-50 [&>li]:py-2 [&>li]:px-2">
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
    </nav>
  );
}
