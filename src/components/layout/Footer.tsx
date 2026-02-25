import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* LOGO & COPYRIGHT */}
        <div className="text-center md:text-left">
          <Link href="/" className="text-xl font-bold text-white block mb-2">
            Rimello
          </Link>
          <div className="text-sm">
            © {new Date().getFullYear()} Rimello. All rights reserved.
          </div>
        </div>

        {/* LINKS */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-center sm:text-left">
          <div>
            <div className="text-white font-medium mb-3">Platform</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">Explore</Link>
              </li>
              <li>
                <Link href="/suggestions" className="hover:text-white transition">AI Matcher</Link>
              </li>
              <li>
                <Link href="/trims" className="hover:text-white transition">All Models</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white font-medium mb-3">Company</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition">My Profile</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
