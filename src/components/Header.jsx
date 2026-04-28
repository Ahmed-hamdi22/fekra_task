import { ClipboardList, CheckCircle2, Circle } from "lucide-react";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-slate-800 p-5 text-white">
      <Icon className="mb-3 h-6 w-6 text-indigo-400" />

      <p className="text-sm text-slate-400">{label}</p>

      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
    </div>
  );
}

function Header({ total, completed, pending }) {
  return (
    <header className="rounded-3xl bg-slate-900 p-8 text-white">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Task Manager</h1>

          <p className="mt-3 text-slate-400">
            Manage your daily tasks and priorities.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={ClipboardList} label="Total" value={total} />

          <StatCard icon={CheckCircle2} label="Completed" value={completed} />

          <StatCard icon={Circle} label="Pending" value={pending} />
        </div>
      </div>
    </header>
  );
}

export default Header;
