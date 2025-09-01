import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h2 className="text-2xl font-bold text-blue-600">Learn Sphere</h2>
        <ul className="flex space-x-6 font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          </li>
          <li>
            <Link href="/courses" className="hover:text-blue-600 transition">Courses</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Header */}
      <header className="bg-gray-900 text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-4">About Learn Sphere</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-300">
          Empowering learners with knowledge, skills, and opportunities to shape the future.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-12 max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Learn Sphere is an online learning platform designed for students,
            developers, and professionals who want to upskill and stay ahead in
            today’s fast-changing world. We provide high-quality, practical
            courses on programming, web development, design, and emerging
            technologies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is simple: to make learning accessible, engaging, and
            career-focused. We believe education should not just be about theory,
            but about gaining the confidence and skills to apply knowledge in
            real-world projects.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Why Learn Sphere?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Expert-led courses designed for beginners and professionals alike</li>
            <li>Hands-on projects to apply your knowledge</li>
            <li>Accessible anytime, anywhere on any device</li>
            <li>Community support and collaborative learning</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 text-center py-6">
        © {new Date().getFullYear()} Learn Sphere. All rights reserved.
      </footer>
    </div>
  );
}
