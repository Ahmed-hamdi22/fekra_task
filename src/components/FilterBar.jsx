import { memo } from "react";

const filterOptions = ["All", "Pending", "Completed", "High", "Medium", "Low"];

const FilterBar = memo(function FilterBar({ selected, onSelect }) {
  return (
    <div className="inline-flex gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
      {filterOptions.map((option) => (
        <button
          key={option}
          type="button"
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            selected === option
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
});

export default FilterBar;
