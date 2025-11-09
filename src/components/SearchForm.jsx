import { useState } from "react";
import { MapPin, Clock } from "lucide-react";

export default function SearchForm({ onSearch, loading }) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [time, setTime] = useState("now");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickup || !dropoff) return;
    onSearch({ pickup, dropoff, time });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="text-sm font-medium text-gray-700">Pickup</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <MapPin size={18} className="text-indigo-600" />
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup location"
              className="w-full outline-none text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="relative">
          <label className="text-sm font-medium text-gray-700">Dropoff</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <MapPin size={18} className="text-pink-600" />
            <input
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Enter destination"
              className="w-full outline-none text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-stretch md:items-end gap-3">
        <div className="md:flex-1">
          <label className="text-sm font-medium text-gray-700">When</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Clock size={18} className="text-emerald-600" />
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-800"
            >
              <option value="now">Now</option>
              <option value="15">In 15 minutes</option>
              <option value="30">In 30 minutes</option>
              <option value="60">In 1 hour</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={!pickup || !dropoff || loading}
          className="md:w-44 inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-5 py-3 transition-colors"
        >
          {loading ? "Searching..." : "Compare Rides"}
        </button>
      </div>
    </form>
  );
}
