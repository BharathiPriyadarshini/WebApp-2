export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm">
        © {new Date().getFullYear()} Rimello. All rights reserved.
      </div>
    </footer>
  );
}
