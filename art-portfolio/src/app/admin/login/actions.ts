"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(_prev: unknown, formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "Admin password not configured" };
  }

  if (password !== adminPassword) {
    return { error: "Incorrect password" };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", crypto.randomUUID(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  redirect("/admin");
}
