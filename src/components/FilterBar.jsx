const filterOptions = ["All", "Pending", "Completed", "High", "Medium", "Low"];

function FilterBar({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            selected === option
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
