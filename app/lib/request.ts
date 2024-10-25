"use client";
import {
  Appointment,
  NewAppointment,
  Role,
  SearchResults,
  SerializedAppointment,
  User,
  UserTable,
} from "@/app/lib/types";

export async function signupEmail({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  return await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({ email, username, role: "OFFICE" }),
    credentials: "same-origin",
  });
}

export async function loginEmail({ email }: { email: string }) {
  return await fetch("/api/signin", {
    method: "POST",
    body: JSON.stringify({ email }),
    credentials: "same-origin",
  });
}

export async function updateProfile(
  fields: Pick<UserTable, "email" | "city" | "name" | "tags">
) {
  return await fetch("/api/updateProfile", {
    method: "POST",
    body: JSON.stringify(fields),
    credentials: "same-origin",
  });
}

export async function updateAppointments(
  apps: (Appointment | SerializedAppointment)[]
) {
  return await fetch("/api/updateAppointments", {
    method: "POST",
    body: JSON.stringify(apps),
    credentials: "same-origin",
  });
}

export async function getMyAppointments(start: Date, end: Date) {
  let res = await fetch("/api/getMyAppointments", {
    method: "POST",
    body: JSON.stringify({ start, end }),
    credentials: "same-origin",
  });

  return <SerializedAppointment[]>(await res.json()).myAppointments;
}

export async function getSearchResults(query: string, page: number) {
  let res = await fetch("/api/search", {
    method: "POST",
    body: JSON.stringify({ page, query }),
  });
  return <SearchResults>(await res.json()).res ?? [];
}

export async function logout() {
  return await fetch("/api/logout", {
    method: "POST",
    body: "{}",
  });
}

export async function createWorker(
  fields: Pick<User, "city" | "email" | "username" | "tags">
) {
  return await fetch("/api/createWorker", {
    method: "POST",
    body: JSON.stringify(fields),
    credentials: "same-origin",
  });
}

export async function deleteWorker(username: string) {
  return await fetch("/api/createWorker", {
    method: "DELETE",
    body: JSON.stringify({ deletedUser: username }),
    credentials: "same-origin",
  });
}

export async function createAppointment(data: NewAppointment) {
  return await fetch("/api/createAppointment", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "same-origin",
  });
}
