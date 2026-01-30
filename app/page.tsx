import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="space-y-6 max-w-2xl">
        <h1>Find your productivity method!</h1>
        <p className="text-gray-600">
          Find the productivity methods that fit you best and try them right
          here on the site.
        </p>
      </div>
      <Link href="/quiz" className="btn-primary">
        Take a test
      </Link>
      <p className="text-blue-500">
        or{" "}
        <Link href="/library" className="underline hover:text-blue-600">
          Browse methods
        </Link>
      </p>
    </>
  );
}
