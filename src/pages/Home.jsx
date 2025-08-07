import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center h-[calc(100vh-5rem)] md:h-[calc(100vh-56px)] px-10 gap-8">
      <div className="space-y-6 max-w-2xl">
        <h1>Find your productivity method!</h1>
        <p className="text-gray-600">
          Find the productivity methods that fit you best and try them right
          here on the site.
        </p>
      </div>
      <Link
        to="/quiz"
        className="main-gradient px-12 py-4 rounded-full text-gray-50 text-lg transition-transform hover:scale-105 shadow-[0px_4px_24px_0_rgba(147,197,253,.70)] animate-[pulse-shadow_2s_ease-in-out_infinite]"
      >
        Take a test
      </Link>
      <p className="text-yellow-400 [&>a]:underline">
        or <Link to="/library">Browse methods</Link>
      </p>
    </div>
  );
}
