import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-600">
      <Outlet />
    </div>
  );
}
