import { Car, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-600 text-white">
            <Car size={20} />
          </div>
          <span className="font-semibold text-lg tracking-tight">CabCompare</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
          <Sparkles size={16} className="text-amber-500" />
          <span>Find the best ride in seconds</span>
        </div>
      </div>
    </header>
  );
}
