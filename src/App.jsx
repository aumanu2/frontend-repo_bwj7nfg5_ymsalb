import { useMemo, useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import ResultsList from "./components/ResultsList";
import ProvidersLegend from "./components/ProvidersLegend";

// Since we don't have real provider APIs wired yet, we'll simulate responses on the client
// In a full build, these would call a backend endpoint that aggregates providers
function simulateQuotes({ pickup, dropoff, time }) {
  const base = Math.max(1, (pickup.length + dropoff.length) / 5);
  const rand = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  const seed = pickup.length * 13 + dropoff.length * 7 + (time === "now" ? 3 : Number(time));
  const providers = [
    { name: "UberX" },
    { name: "Lyft" },
    { name: "Bolt" },
    { name: "Ola" },
  ];
  return providers.map((p, idx) => {
    const r = rand(seed + idx);
    const price = (base * (7 + r * 10)).toFixed(2);
    const eta = Math.max(2, Math.round(2 + r * 10));
    const distance = (2 + r * 10).toFixed(1);
    const surge = r > 0.75;
    return {
      id: `${p.name}-${idx}`,
      provider: p.name,
      price: `$${price}`,
      eta,
      distance,
      surge,
    };
  }).sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (payload) => {
    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 700));
    const data = simulateQuotes(payload);
    setResults(data);
    setLoading(false);
  };

  const bestPrice = useMemo(() => {
    if (!results.length) return null;
    return results.reduce((min, r) => (parseFloat(r.price.slice(1)) < parseFloat(min.price.slice(1)) ? r : min), results[0]);
  }, [results]);

  const fastest = useMemo(() => {
    if (!results.length) return null;
    return results.reduce((min, r) => (r.eta < min.eta ? r : min), results[0]);
  }, [results]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <section className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">Compare rides across apps</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter where you're going and instantly see prices and pickup times from multiple ride apps.
          </p>
        </section>

        <SearchForm onSearch={handleSearch} loading={loading} />

        {bestPrice || fastest ? (
          <div className="grid md:grid-cols-2 gap-4">
            {bestPrice && (
              <div className="p-4 rounded-2xl border bg-emerald-50 border-emerald-200">
                <div className="text-sm text-emerald-700 font-medium">Best price</div>
                <div className="text-2xl font-semibold text-emerald-900 mt-1">{bestPrice.price}</div>
                <div className="text-sm text-emerald-800">{bestPrice.provider} · {bestPrice.eta} min ETA</div>
              </div>
            )}
            {fastest && (
              <div className="p-4 rounded-2xl border bg-indigo-50 border-indigo-200">
                <div className="text-sm text-indigo-700 font-medium">Fastest pickup</div>
                <div className="text-2xl font-semibold text-indigo-900 mt-1">{fastest.eta} min</div>
                <div className="text-sm text-indigo-800">{fastest.provider} · {fastest.price}</div>
              </div>
            )}
          </div>
        ) : null}

        <ResultsList results={results} loading={loading} />

        <ProvidersLegend />
      </main>

      <footer className="py-10 text-center text-xs text-gray-500">
        Built for quick, apples-to-apples ride comparisons.
      </footer>
    </div>
  );
}
