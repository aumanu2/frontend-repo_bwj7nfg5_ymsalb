import { Car, Clock, DollarSign, Navigation } from "lucide-react";

function RideCard({ provider, price, eta, distance, surge }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gray-100">
          <Car size={20} className="text-indigo-600" />
        </div>
        <div>
          <div className="font-semibold text-gray-900">{provider}</div>
          <div className="text-xs text-gray-500">{distance} km away</div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 text-gray-700">
          <DollarSign size={16} className="text-emerald-600" />
          <span className="font-medium">{price}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-700">
          <Clock size={16} className="text-indigo-600" />
          <span className="font-medium">{eta} min</span>
        </div>
        {surge && (
          <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">Surge</span>
        )}
        <button className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-black">
          <Navigation size={14} /> Book
        </button>
      </div>
    </div>
  );
}

export default function ResultsList({ results, loading }) {
  if (loading) {
    return (
      <div className="text-center text-gray-500">Crunching data from providers...</div>
    );
  }
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-gray-500">No results yet. Search to compare rides.</div>
    );
  }
  return (
    <div className="space-y-3">
      {results.map((r) => (
        <RideCard key={r.id} {...r} />
      ))}
    </div>
  );
}
