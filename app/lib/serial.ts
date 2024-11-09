import { SerializedAppointment, Appointment } from "@/app/lib/types";
import { add, sub } from "date-fns";

export function deserializeAppointment(a: SerializedAppointment) {
  let { appointment_time, created_at, updated_at, ...rest } = a;
  return {
    ...rest,
    appointment_time: add(appointment_time, {
      minutes: new Date().getTimezoneOffset(),
    }),
    created_at: new Date(created_at),
    updated_at: new Date(updated_at),
  };
}

export function serializeAppointment(a: Appointment) {
  let { appointment_time, created_at, updated_at, ...rest } = a;

  return {
    ...rest,
    appointment_time: sub(appointment_time.toISOString(), {
      minutes: new Date().getTimezoneOffset(),
    }).toISOString(),
    created_at: created_at.toString(),
    updated_at: updated_at.toString(),
  };
}
