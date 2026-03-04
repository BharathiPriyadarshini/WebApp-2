import { Zap, Gauge, Timer } from 'lucide-react';

export default function DetailsSection({ car }: any) {
  return (
    <section id="details" className="space-y-8">
      <p>{car.description}</p>

      <div className="flex gap-4">
        <Spec icon={Zap} label="HP" value={car.horsepower} />
        <Spec icon={Gauge} label="Torque" value={car.torque} />
        <Spec icon={Timer} label="0-60" value={car.acceleration} />
      </div>
    </section>
  );
}

function Spec({ icon: Icon, label, value }: any) {
  return (
    <div className="p-4 border rounded-xl text-center">
      <Icon />
      <p className="font-bold">{value}</p>
      <p className="text-xs">{label}</p>
    </div>
  );
}