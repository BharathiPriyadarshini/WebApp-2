import { FEATURE_CATEGORIES } from '@/constants/featureCategories';

export default function FeaturesSection() {
  return (
    <section id="features" className="space-y-6">
      <h2 className="text-2xl font-bold">Features</h2>

      {FEATURE_CATEGORIES.map((cat) => (
        <div key={cat.id} className="border rounded-xl p-4">
          <h3 className="font-semibold">{cat.label}</h3>
          {cat.features.map((f) => (
            <p key={f.name} className="text-sm">
              {f.name} {f.available ? '✓' : '—'}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}