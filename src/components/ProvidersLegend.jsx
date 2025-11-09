import { ShieldCheck, BadgeCheck, Timer, DollarSign } from "lucide-react";

export default function ProvidersLegend() {
  const items = [
    { icon: <DollarSign size={16} className="text-emerald-600" />, title: "Best price", desc: "We highlight the cheapest option" },
    { icon: <Timer size={16} className="text-indigo-600" />, title: "Fastest ETA", desc: "See who can pick you up faster" },
    { icon: <ShieldCheck size={16} className="text-amber-600" />, title: "Trust & safety", desc: "We compare top, trusted providers" },
    { icon: <BadgeCheck size={16} className="text-pink-600" />, title: "Transparent", desc: "No hidden fees in our comparisons" },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-3">
      {items.map((it) => (
        <div key={it.title} className="p-4 rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            {it.icon}
            <div className="font-medium text-gray-900">{it.title}</div>
          </div>
          <div className="text-xs text-gray-500 mt-1">{it.desc}</div>
        </div>
      ))}
    </div>
  );
}
