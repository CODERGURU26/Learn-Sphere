import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="w-full bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Learn Sphere</h1>
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/admin" className="hover:text-gray-300">
              Courses
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to Learn Sphere</h2>
        <p className="max-w-2xl text-lg text-gray-600 mb-6">
          Learn Sphere is your one-stop platform for learning programming,
          development, and emerging technologies. Explore expert-led courses,
          interactive lessons, and real-world projects to boost your skills and
          career.
        </p>
        <Link
          href="/admin"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Browse Courses
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 text-center py-4">
        © {new Date().getFullYear()} Learn Sphere. All rights reserved.
      </footer>
    </div>
  );
}
