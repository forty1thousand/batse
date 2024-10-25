import { SerializedAppointment, Appointment } from "@/app/lib/types";

export function deserializeAppointment(a: SerializedAppointment) {
  let { appointment_time, created_at, updated_at, ...rest } = a;
  return {
    ...rest,
    appointment_time: new Date(appointment_time),
    created_at: new Date(created_at),
    updated_at: new Date(updated_at),
  };
}

export function serializeAppointment(a: Appointment) {
  let { appointment_time, created_at, updated_at, ...rest } = a;

  return {
    ...rest,
    appointment_time: appointment_time.toString(),
    created_at: created_at.toString(),
    updated_at: updated_at.toString(),
  };
}
