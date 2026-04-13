import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "../lib/auth";

export function RequireAuth() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    void isAuthenticated().then(setAllowed);
  }, []);

  if (allowed === null) {
    return <div className="p-6 text-sm text-slate-600">Validando sessão...</div>;
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
