const types = ["SUV", "Sedan", "Hatchback", "Electric"];

export default function ByCarType() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-10">
        Browse By Type
      </h2>

      <div className="flex flex-wrap gap-4">
        {types.map((type) => (
          <button
            key={type}
            className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition"
          >
            {type}
          </button>
        ))}
      </div>
    </section>
  );
}
