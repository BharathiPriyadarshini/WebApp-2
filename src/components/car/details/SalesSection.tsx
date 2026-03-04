import { SALES_DATA } from '@/constants/mockData';

export default function SalesSection() {
  return (
    <section id="sales" className="space-y-6">
      <h2 className="text-2xl font-bold">Sales</h2>

      {SALES_DATA.map((s) => (
        <p key={s.month}>
          {s.month}: {s.sales}
        </p>
      ))}
    </section>
  );
}