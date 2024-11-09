"use client";
import { Button } from "@/app/components/button";
import { WeekView } from "@/app/components/calendar";
import { F, Input, Radio, Textarea } from "@/app/components/form";
import { Line } from "@/app/components/line";
import {
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@/app/components/listbox";
import { Modal } from "@/app/components/modal";
import { GenericHeader, Label, Subtle } from "@/app/components/text";
import { createAppointment, getAppointments } from "@/app/lib/request";
import { Listbox, RadioGroup } from "@headlessui/react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  startOfToday,
  sub,
} from "date-fns";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

export default function ({
  data: { slot, name, username, bookings_public },
}: {
  data: {
    [_: string]: any;
    slot: number | null;
    bookings_public: boolean;
    username: string;
    name: string | null;
  };
}) {
  let [start, setStart] = useState(startOfToday());

  let week = eachDayOfInterval({
    start,
    end: add(start, { days: 6 }),
  });

  function minusWeek() {
    setStart(sub(start, { weeks: 1 }));
  }

  function addWeek() {
    setStart(add(start, { weeks: 1 }));
  }

  let { data } = useSWR(
    [
      startOfMonth(sub(start, { months: 1 })),
      endOfMonth(add(start, { months: 1 })),
      username,
    ],
    ([x, y, z]) => getAppointments(x, y, z)
  );

  let [open, setOpen] = useState(false);

  return (
    <F
      initialValues={{
        email: "",
        description: "",
        day: "",
        hour: "0",
        time: undefined as undefined | string,
        slot: String(slot ?? 60),
      }}
      onSubmit={async ({ description, email, slot, day, hour, time }) => {
        await new Promise((res) => setTimeout(res, 100));

        try {
          let res;

          if (time)
            res = await createAppointment({
              description,
              email,
              slot: Number(slot),
              worker: username,
              appointment_time: time,
            });
          else
            res = await createAppointment({
              description,
              email,
              slot: Number(slot),
              worker: username,
              appointment_time: add(new Date(day), {
                minutes: Number(hour) * Number(slot),
              }).toString(),
            });

          if (res.ok) setOpen(true);
        } catch {}
      }}
    >
      {({
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors,
        touched,
        isSubmitting,
        setFieldValue,
      }) => (
        <form className="flex flex-col h-full" onSubmit={handleSubmit}>
          <Modal open={open} closeModal={setOpen}>
            <div className="grid place-items-center p-8">
              <CheckCircle className="size-32 stroke-green-500" />
              <div>
                <GenericHeader className="text-center mt-10">
                  Success!
                </GenericHeader>
                <Subtle className="text-center">
                  You successfully made an appointment.
                </Subtle>
              </div>
            </div>
          </Modal>
          <div className="flex items-center gap-x-2">
            <Line className="flex-1" />
            <GenericHeader className="text-2xl font-semibold text-right">
              Book with {name}
            </GenericHeader>
          </div>
          <div className="grid grid-cols-1 gap-y-4">
            <GenericHeader h2>General information</GenericHeader>
            <div className="w-full">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input
                className="w-full"
                id="email"
                placeholder="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                invalid={Boolean(errors.email) && touched.email}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="description" className="font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Description - If you wish list some other bookings times."
                className="w-full h-[8ch]"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                invalid={Boolean(errors.description) && touched.description}
              />
            </div>
            <Line className="my-4" />
            <div>
              <GenericHeader h2>Booking time</GenericHeader>
              {bookings_public && (
                <Subtle>
                  Your appointment is the blue one. Drag it to the date and time
                  you desire. Other's appointments are grayed out.
                </Subtle>
              )}
            </div>
            {!bookings_public && (
              <div className="w-fit grid grid-cols-1">
                <div className="flex items-center mb-2">
                  <span className="text-sm pointer-events-none">
                    {format(start, "LLLL yyyy")}
                  </span>
                  <Button
                    variant="text"
                    type="button"
                    disabled={start <= new Date()}
                    onClick={minusWeek}
                    className="rounded-full size-8 ml-auto"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    variant="text"
                    type="button"
                    onClick={addWeek}
                    className="rounded-full size-8"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
                <RadioGroup
                  onChange={setFieldValue.bind(null, "day")}
                  className="flex gap-x-2"
                >
                  {week.map((day) => (
                    <Radio
                      className="font-mono"
                      value={day.toDateString()}
                      key={day.toDateString()}
                    >
                      {format(day, "dd E")}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            )}
            <div>
              <GenericHeader h2 className="pointer-events-none text-base">
                Duration
              </GenericHeader>
              <Listbox onChange={setFieldValue.bind(null, "slot")}>
                <ListboxButton>{values.slot} Minutes</ListboxButton>
                <ListboxOptions className="z-50">
                  <ListboxOption value={15}>15 Minutes</ListboxOption>
                  <ListboxOption value={30}>30 Minutes</ListboxOption>
                  <ListboxOption value={45}>45 Minutes</ListboxOption>
                  <ListboxOption value={60}>60 Minutes</ListboxOption>
                </ListboxOptions>
              </Listbox>
            </div>
            {!bookings_public && (
              <div>
                <GenericHeader className="pointer-events-none text-base">
                  Time
                </GenericHeader>
                <Listbox onChange={setFieldValue.bind(null, "hour")}>
                  <ListboxButton>
                    {format(
                      add(startOfToday(), {
                        minutes: Number(values.hour) * Number(values.slot),
                      }),
                      "hh:mm a"
                    )}
                  </ListboxButton>
                  <ListboxOptions>
                    {Array.from({ length: 200 }).map(
                      (_, i) =>
                        i * Number(values.slot) < 24 * 60 && (
                          <ListboxOption key={`${i} why`} value={i}>
                            {format(
                              add(startOfToday(), {
                                minutes: i * Number(values.slot),
                              }),
                              "hh:mm a"
                            )}
                          </ListboxOption>
                        )
                    )}
                  </ListboxOptions>
                </Listbox>
              </div>
            )}
          </div>
          {bookings_public && (
            <>
              <div className="mt-4" />
              <WeekView
                stat
                onChangeDate={(newDate) => setStart(new Date(newDate))}
                onChange={(apps) => {
                  setFieldValue(
                    "time",
                    apps.find((a) => a.id == "NEW")?.appointment_time
                  );
                  console.log(
                    apps.find((a) => a.id == "NEW")?.appointment_time
                  );
                }}
                bookings={[...(data ?? [])].concat([
                  {
                    appointment_time: start.toISOString(),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    //@ts-ignore
                    email: values.email,
                    id: "NEW" as const,
                    slot: Number(values.slot),
                    status: "AWAITING",
                    worker: "",
                  },
                ])}
              />
              <div className="mt-4" />
            </>
          )}
          <Button
            loading={isSubmitting}
            className="mt-auto w-full"
            variant="seethru"
            type="submit"
            disabled={
              values.description == "" ||
              values.email == "" ||
              (values.day == "" && values.time == "")
            }
          >
            Schedule with {name ?? username}
            <ChevronRight className="size-4 stroke-muted ml-1 mt-0.5" />
          </Button>
        </form>
      )}
    </F>
  );
}
