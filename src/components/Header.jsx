import { useMemo } from "react";
import { ClipboardList, CheckCircle2, Circle, TrendingUp } from "lucide-react";

function StatCard({ icon: Icon, label, value, color = "indigo" }) {
  const bgColors = {
    indigo: "bg-indigo-500/10",
    emerald: "bg-emerald-500/10",
    amber: "bg-amber-500/10",
  };

  const textColors = {
    indigo: "text-indigo-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
  };

  return (
    <div className="group relative overflow-hidden rounded-[1.5rem] bg-slate-900/80 p-6 ring-1 ring-white/10 transition-all duration-300 hover:ring-white/20">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        <div
          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl ${bgColors[color]}`}
        >
          <Icon className={`h-5 w-5 ${textColors[color]}`} />
        </div>
        <span className="block text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
          {label}
        </span>
        <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function Header({ total, completed, pending }) {
  const stats = useMemo(
    () => [
      { icon: ClipboardList, label: "Total", value: total, color: "indigo" },
      {
        icon: CheckCircle2,
        label: "Completed",
        value: completed,
        color: "emerald",
      },
      { icon: Circle, label: "Pending", value: pending, color: "amber" },
    ],
    [total, completed, pending],
  );

  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-8 shadow-2xl shadow-slate-900/50 text-slate-50">
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-500/5 blur-3xl" />

      <div className="relative z-10 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-indigo-300">
            <TrendingUp className="h-4 w-4" />
            Productive Dashboard
          </p>
          <h1 className="text-5xl font-bold tracking-tight">Task Manager</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Track assignments, update priorities, and keep completion progress
            visible.
          </p>
        </div>

        <div className="grid auto-rows-max gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
