import "server-only";
import { db } from "@/app/lib/db";
import { Generated } from "kysely";

export interface SearchData {
  query: string;
  page: number;
}

export type Role = "OFFICE" | "NORMAL" | "WORKER";

export type Status = "AWAITING" | "ACCEPTED" | "REJECTED";

export interface SignupData {
  username: string;
  email: string;
  role?: Role;
}

export interface SigninData {
  email: string;
}

export type SearchResults = User[];

export interface UserTable {
  username: string;
  email: string;
  role: Generated<Role>;
  slot: number | null;
  city: string | null;
  name: string | null;
  tags: string | null;
  office: string | null;
  workers: Generated<string[]>;
  has_access: Generated<boolean>;
  price_id: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
  combined_text: string | null;
  bookings_public: Generated<boolean>;
}

export interface AppointmentsTable {
  id: Generated<string>;
  email: string;
  worker: string;
  status: Generated<Status>;
  description: string;
  appointment_time: Date;
  slot: Generated<number>;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface Appointment {
  id: string;
  email: string;
  worker: string;
  status: Status;
  description: string;
  slot: number;
  appointment_time: Date;
  created_at: Date;
  updated_at: Date;
}

export interface SerializedAppointment {
  id: string | "NEW";
  email: string;
  worker: string;
  status: Status;
  description: string;
  slot: number;
  appointment_time: string;
  created_at: string;
  updated_at: string;
}

export interface NewAppointment {
  email: string;
  worker: string;
  description: string;
  appointment_time: string;
  slot: number;
}

export interface User {
  name: string | null;
  username: string;
  email: string;
  role: Role;
  slot: number | null;
  city: string | null;
  tags: string | null;
  office: string | null;
  workers: string[];
  has_access: boolean;
  price_id: string | null;
  bookings_public: boolean;
  created_at: Date;
  updated_at: Date;
}

export enum AppointmentStatus {
  Approved,
  Awaiting,
  Rejected,
}

export interface TokensTable {
  username: string;
  count: Generated<number>;
}

export interface DB {
  users: UserTable;
  tokens: TokensTable;
  appointments: AppointmentsTable;
}

export async function validateUser({
  email,
  username,
}: Omit<SignupData, "role">) {
  let output = { username: "", email: "" };
  let errors = false;

  if (username.length > 30) {
    errors = true;
    output.username = "Username too long";
  } else if (
    Boolean(
      await db
        .selectFrom("users")
        .selectAll()
        .where("username", "=", username)
        .executeTakeFirst()
    )
  ) {
    errors = true;
    output.username = "Username taken";
  }

  let userByEmail = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  if (Boolean(userByEmail)) {
    errors = true;
    output.email = "Email taken";
  }

  return errors ? output : null;
}

export function omitSensitiveFields<
  T extends { email?: any; price_id?: any; has_access?: any; description?: any }
>(u: T) {
  let { email, price_id, has_access, description, ...res } = u;

  Reflect.deleteProperty(res, "email");
  Reflect.deleteProperty(res, "price_id");
  Reflect.deleteProperty(res, "has_access");
  Reflect.deleteProperty(res, "description");

  return res;
}
