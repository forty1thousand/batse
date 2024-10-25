"use client";
import { MonthView } from "@/app/components/calendar";
import { SerializedAppointment } from "@/app/lib/types";
import { useState } from "react";

export default function Calendar({
  bookings,
}: {
  bookings: SerializedAppointment[];
}) {
  let [b, setB] = useState(bookings);
  return <MonthView mutable onUpdate={setB} bookings={b} />;
}
