"use client";
import {
  Appointment,
  NewAppointment,
  SearchResults,
  SerializedAppointment,
  User,
  UserTable,
} from "@/app/lib/types";
import { sub } from "date-fns";

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
  let ap = apps.map((a) => ({
    ...a,
    appointment_time: sub(a.appointment_time, {
      minutes: new Date().getTimezoneOffset(),
    }).toISOString(),
  }));

  return await fetch("/api/updateAppointments", {
    method: "POST",
    body: JSON.stringify(ap),
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

export async function getAppointments(
  start: Date,
  end: Date,
  username: string
) {
  let res = await fetch("/api/getAppointments", {
    method: "POST",
    body: JSON.stringify({ start, end, username }),
    credentials: "same-origin",
  });

  return <Omit<SerializedAppointment, "email" | "description">[]>(
    (await res.json()).appointments
  );
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
  fields: Pick<User, "city" | "email" | "username" | "tags" | "name">
) {
  return await fetch("/api/createWorker", {
    method: "POST",
    body: JSON.stringify(fields),
    credentials: "same-origin",
  });
}

export async function updateWorker(
  fields: Pick<
    User,
    "city" | "email" | "tags" | "bookings_public" | "name" | "username"
  >
) {
  return await fetch("/api/createWorker", {
    method: "PUT",
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

export async function createAppointment({
  appointment_time,
  ...data
}: NewAppointment) {
  return await fetch("/api/createAppointment", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      appointment_time: appointment_time,
    }),
    credentials: "same-origin",
  });
}
