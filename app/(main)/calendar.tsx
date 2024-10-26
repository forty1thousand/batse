"use client";
import { MonthView, WeekView } from "@/app/components/calendar";
import { SerializedAppointment } from "@/app/lib/types";
import { add, startOfToday, startOfTomorrow } from "date-fns";
import { useState } from "react";

export function CalendarMonth() {
  let [b, setB] = useState<SerializedAppointment[]>([
    {
      appointment_time: add(startOfToday(), { hours: 9 }).toString(),
      created_at: "",
      updated_at: "",
      description: "",
      email: "4@example.com",
      id: "1",
      slot: 60,
      status: "ACCEPTED",
      worker: "brad",
    },
    {
      appointment_time: add(startOfToday(), { hours: -49 }).toString(),
      created_at: "",
      updated_at: "",
      description: "",
      email: "email@example.com",
      id: "12",
      slot: 60,
      status: "ACCEPTED",
      worker: "brad",
    },
    {
      appointment_time: add(startOfToday(), { hours: -64 }).toString(),
      created_at: "",
      updated_at: "",
      description: "",
      email: "ben@example.com",
      id: "14",
      slot: 60,
      status: "AWAITING",
      worker: "me",
    },
    {
      appointment_time: add(startOfTomorrow(), { hours: 30 }).toString(),
      created_at: "",
      updated_at: "",
      description: "",
      email: "james@example.com",
      id: "2",
      slot: 60,
      status: "ACCEPTED",
      worker: "mike",
    },
    {
      appointment_time: add(startOfToday(), { hours: 74 }).toString(),
      created_at: "",
      updated_at: "",
      description: "",
      email: "revenue@example.com",
      id: "3",
      slot: 60,
      status: "AWAITING",
      worker: "me",
    },
  ]);
  return <MonthView mutable onUpdate={setB} bookings={b} />;
}

export function CalendarWeek() {
  return (
    <WeekView
      vanity
      mutable
      bookings={[
        {
          appointment_time: add(startOfToday(), { hours: 9 }).toString(),
          created_at: "",
          updated_at: "",
          description: "",
          email: "4@example.com",
          id: "1",
          slot: 60,
          status: "ACCEPTED",
          worker: "brad",
        },
        {
          appointment_time: add(startOfToday(), { hours: -49 }).toString(),
          created_at: "",
          updated_at: "",
          description: "",
          email: "email@example.com",
          id: "12",
          slot: 60,
          status: "ACCEPTED",
          worker: "brad",
        },
        {
          appointment_time: add(startOfToday(), { hours: -64 }).toString(),
          created_at: "",
          updated_at: "",
          description: "",
          email: "ben@example.com",
          id: "14",
          slot: 60,
          status: "AWAITING",
          worker: "me",
        },
        {
          appointment_time: add(startOfTomorrow(), { hours: 30 }).toString(),
          created_at: "",
          updated_at: "",
          description: "",
          email: "james@example.com",
          id: "2",
          slot: 60,
          status: "ACCEPTED",
          worker: "mike",
        },
        {
          appointment_time: add(startOfToday(), { hours: 74 }).toString(),
          created_at: "",
          updated_at: "",
          description: "",
          email: "revenue@example.com",
          id: "3",
          slot: 60,
          status: "AWAITING",
          worker: "me",
        },
      ]}
    />
  );
}
