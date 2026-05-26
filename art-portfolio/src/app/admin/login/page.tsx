"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm border border-zinc-200"
      >
        <h1 className="mb-6 text-2xl font-bold text-zinc-900">Admin Login</h1>

        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />

        {state?.error && (
          <p className="mt-2 text-sm text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-4 w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {pending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
