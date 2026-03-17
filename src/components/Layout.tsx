import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="flex flex-col h-full w-full bg-slate-50 overflow-hidden text-slate-900 font-sans">
      <main className="flex-1 overflow-y-auto relative hide-scrollbar">
        <Outlet />
      </main>
    </div>
  );
}
