"use client";
import { Button } from "@/app/components/button";
import { Line } from "@/app/components/line";
import { LocalState } from "@/app/components/localstate";
import { deserializeAppointment, serializeAppointment } from "@/app/lib/serial";
import { Appointment, SerializedAppointment, Status } from "@/app/lib/types";
import {
  add,
  differenceInDays,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfMonth,
  endOfToday,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isSaturday,
  isSunday,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
  sub,
} from "date-fns";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

export function Calendar({
  onUpdate,
  size = "regular",
}: {
  onUpdate?(newDate: Date): void;
  size?: "small" | "regular";
}) {
  let today = startOfToday();
  let [selected, setSelected] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className={size == "small" ? "w-56" : "w-96"}>
      <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-primary">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <Button
          type="button"
          variant="text"
          onClick={previousMonth}
          className="-my-1.5 -mr-1.5 ml-2 flex-none p-1.5"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="size-5" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="text"
          onClick={nextMonth}
          className="-my-1.5 -mr-1.5 ml-2 flex-none p-1.5"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="size-5" aria-hidden="true" />
        </Button>
      </div>
      <div
        className={twJoin(
          "grid grid-cols-7 text-xs leading-6 text-center text-muted",
          size == "regular" ? "mt-10" : "mt-4"
        )}
      >
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="grid grid-cols-7 mt-2 text-sm">
        {days.map((day, dayIdx) => (
          <div
            key={`${day.toDateString()} ${currentMonth}`}
            className={twJoin(
              dayIdx === 0 && colStartClasses[getDay(day)],
              "py-1.5"
            )}
          >
            <Button
              type="button"
              variant="text"
              onClick={() => {
                if (!isSameMonth(day, firstDayCurrentMonth)) {
                  setCurrentMonth(format(day, "MMM-yyyy"));
                }
                setSelected(day);
                onUpdate && onUpdate(day);
              }}
              className={twJoin(
                !isSameMonth(day, firstDayCurrentMonth) && "text-muted",
                isEqual(day, selected) &&
                  "bg-destructive hover:bg-destructive text-white font-semibold",
                "mx-auto flex items-center justify-center rounded-full",
                size == "small" ? "size-6" : "size-8"
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export function WeekView({
  bookings: appointments,
  mutable = false,
  onChange,
  onChangeDate,
  start,
  vanity = false,
  stat = false,
}: {
  bookings: any[];
  mutable?: boolean;
  onChange?(newBookings: any[]): void;
  onChangeDate?(newDate: string): void;
  start?: string;
  vanity?: boolean;
  stat?: boolean;
}) {
  let [currentWeek, setCurrentWeek] = useState(
    format(start ?? startOfToday(), "RRRR-II")
  );
  let [year, weeks] = currentWeek.split("-").map(Number);

  let firstDayCurrentWeek = add(new Date(year, 0), { weeks: weeks - 1 });
  let days = eachDayOfInterval({
    start: firstDayCurrentWeek,
    end: add(firstDayCurrentWeek, { days: 6 }),
  });

  let bookings = appointments.map(deserializeAppointment);

  let hours = eachHourOfInterval({
    start: startOfToday(),
    end: add(endOfToday(), { hours: 0 }),
  });

  function previousWeek() {
    let firstDayNext = sub(firstDayCurrentWeek, { weeks: 1 });
    onChangeDate && onChangeDate(firstDayNext.toISOString());
    setCurrentWeek(format(firstDayNext, "RRRR-II"));
  }

  function nextWeek() {
    let firstDayNext = add(firstDayCurrentWeek, { weeks: 1 });
    onChangeDate && onChangeDate(firstDayNext.toISOString());
    setCurrentWeek(format(firstDayNext, "RRRR-II"));
  }

  let ref = useRef<HTMLDivElement>(null);

  return (
    <div>
      {!vanity && (
        <div className="flex">
          <h2 className="flex-auto font-semibold text-primary">
            {format(firstDayCurrentWeek, "MMMM yyyy")}
          </h2>
          <Button
            className="rounded-full ml-auto"
            type="button"
            variant="text"
            onClick={previousWeek}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            type="button"
            className="rounded-full"
            variant="text"
            onClick={nextWeek}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      )}
      <div className="flex min-h-[80rem] h-screen w-auto mt-10">
        <div className="flex flex-col w-fit -translate-y-[2.08%] mr-1">
          <div className="h-[40px]" />
          {hours.map((hour) => (
            <time
              key={hour.getHours()}
              className="w-[50px] flex-1 text-right overflow-hidden text-xs text-muted flex justify-end items-center font-light"
              dateTime={format(hour, "h a")}
            >
              {format(hour, "h a")}
            </time>
          ))}
        </div>
        <div className="relative w-full flex">
          {days.map((day, daysIndex) => (
            <div className="flex flex-col flex-1" key={day.toDateString()}>
              <div className="grid backdrop-blur-xl sticky w-full top-0 z-10 self-start h-10">
                <time
                  className="text-base text-subtle place-self-center text-nowrap overflow-hidden text-ellipsis"
                  dateTime={format(day, "E d")}
                >
                  {format(day, "E d")}
                </time>
                <Line className="w-full place-self-end" />
              </div>
              <div className="flex flex-col flex-1 relative">
                {hours.map((_, hoursIndex) => (
                  <div
                    className={twJoin(
                      "flex-auto border-faint",
                      daysIndex != 0 && "border-l",
                      hoursIndex != 0 && "border-t"
                    )}
                    key={`${daysIndex}, ${hoursIndex}`}
                  />
                ))}
              </div>
            </div>
          ))}
          <div
            className="absolute w-full mt-10 h-[calc(100%-40px)] overflow-clip"
            ref={ref}
          >
            {bookings.map((appointment) => {
              if (
                days.some((day) =>
                  isSameDay(appointment.appointment_time.toISOString(), day)
                )
              )
                return (
                  days.some((day) =>
                    isSameDay(appointment.appointment_time.toISOString(), day)
                  ) && (
                    <Event
                      week={currentWeek}
                      key={appointment.id}
                      constraintsRef={ref}
                      appointment={{
                        ...appointment,
                        appointment_time:
                          appointment.appointment_time.toISOString(),
                      }}
                      firstDay={days[0].toISOString()}
                      appointments={bookings}
                      onChange={onChange ?? (() => null)}
                      mutable={mutable || appointment.id == "NEW"}
                      stat={stat}
                      movable={appointment.id == "NEW"}
                    />
                  )
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface EventProps {
  appointment: Omit<Appointment, "appointment_time"> & {
    appointment_time: string;
  };
  appointments: Appointment[];
  constraintsRef: React.RefObject<Element>;
  onChange: NonNullable<Parameters<typeof WeekView>[0]["onChange"]>;
  firstDay: string;
  mutable: boolean;
  week: string;
  stat?: boolean;
  movable?: boolean;
}

let Event = memo<EventProps>(function ({
  appointment: { id, ...appointment },
  constraintsRef,
  firstDay,
  onChange,
  appointments: bookings,
  mutable,
  week,
  stat = false,
  movable = false,
}) {
  let y = useMotionValue(0);
  let x = useMotionValue(0);

  let dull, bright, text;

  switch (appointment.status) {
    case "AWAITING":
      [dull, bright, text] = ["bg-warn/30", "bg-warn", "text-warn"];
      break;
    case "ACCEPTED":
      [dull, bright, text] = [
        "bg-green-500/30",
        "bg-green-500",
        "text-green-500",
      ];
      break;
    case "REJECTED":
      [dull, bright, text] = [
        "bg-destructive/20",
        "bg-destructive",
        "text-destructive",
      ];
      break;
    default:
      [dull, bright, text] = ["bg-warn/30", "bg-warn", "text-warn"];
      break;
  }

  if (stat)
    [dull, bright, text] = ["bg-subtle/10", "bg-subtle/70", "text-subtle"];
  if (movable)
    [dull, bright, text] = ["bg-outline/15", "bg-outline/90", "text-outline"];

  let date = useTransform(y, (value) => {
    let res = new Date(appointment.appointment_time);

    let hi = constraintsRef.current?.getBoundingClientRect().height ?? 912;

    res.setHours(Math.floor((value / hi) * 24));

    let mins = (value / hi) * 24;
    mins = (mins - Math.floor(mins)) * 60;

    res.setMinutes(Math.round(mins));

    return format(res, "h:mm a");
  });

  useEffect(() => {
    let appointment_time = new Date(appointment.appointment_time);
    let height = constraintsRef.current?.getBoundingClientRect().height ?? 0;
    let width = constraintsRef.current?.getBoundingClientRect().width ?? 0;

    let yPercent =
      (appointment_time.getHours() + appointment_time.getMinutes() / 60) / 24;
    let xPercent = Math.abs(differenceInDays(appointment_time, firstDay)) / 7;
    // yPercent =
    //   (appointment_time.getHours() +
    //     appointment_time.getMinutes() / 60 -
    //     24) /
    //   24;
    // xPercent = (appointment_time.getDate() - days[0].getDate() + 1) / 7;

    let yPixels = height * yPercent;
    let xPixels = width * xPercent;

    // y.set(positions.current.get(id) ?? yPixels);
    // x.set(positions.current.get(xId(id) ?? xPixels));

    x.set(xPixels);
    animate(y, yPixels, {
      duration: 0,
    });

    // y.set(yPixels);
    // x.set(xPixels);
  }, [constraintsRef]);

  let handleDragEnd = () => {
    let currentY = y.get();
    let currentX = x.get();
    let hi = constraintsRef.current?.getBoundingClientRect().height ?? 912;
    let wi = constraintsRef.current?.getBoundingClientRect().width ?? 912;

    let k = hi / 96; // snap to every 15th minute. 24 would be every hour
    let m = wi / 7;

    let snappedY = Math.round(currentY / k) * k;
    let newX = Math.round(currentX / m) * m;

    y.set(snappedY);
    x.set(newX);

    let newAppointments = bookings.filter((app) => app.id != id);
    let app = bookings.find((app) => app.id == id);

    if (app) {
      let hours = (snappedY / hi) * 24;

      let day = Math.round((newX / wi) * 7);

      app.appointment_time = add(parse(week, "RRRR-II", new Date()), {
        days: day,
      });

      app.appointment_time.setHours(
        Math.floor(hours),
        (hours - Math.floor(hours)) * 60,
        0,
        0
      );
    }

    let ap = app != undefined ? [app] : [];
    let a = [...newAppointments, ...ap];

    onChange(a.map(serializeAppointment));
  };

  return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={twJoin(
          "absolute self-center rounded w-[14.2857%] overflow-clip flex z-[8] h-1/2 backdrop-blur",
          mutable && "cursor-grab",
          dull
        )}
        onDragEnd={handleDragEnd}
        onDrag={(_, info) => {
          let deltaX = info.delta.x;
          let currentX = x.get();
          let wi = constraintsRef.current?.getBoundingClientRect().width ?? 912;

          let m = wi / 7;

          let snappedX = Math.round((currentX + deltaX) / m) * m;

          x.set(snappedX);
        }}
        whileTap={mutable ? { cursor: "grabbing", scale: 0.95 } : undefined}
        style={{
          height: `${(100 / 24) * (appointment.slot / 60)}%` /* 1 hour */,
          touchAction: "none",
          x,
          y,
        }}
      >
        <div className={twJoin("h-full w-1", bright)} />
        <div className="flex flex-1 items-center h-fit">
          <motion.span
            className={twJoin(
              "p-0.5 pointer-events-none text-xs text-nowrap",
              text
            )}
          >
            {date}
          </motion.span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={twJoin(
          "absolute self-center w-[14.2857%] overflow-clip flex z-0 h-1/2",
          !mutable && "z-20"
        )}
        style={{
          height: `${(100 / 24) * (appointment.slot / 60)}%` /* 1 hour */,
          touchAction: "none",
          x,
          y,
        }}
      />
    </>
  );
});

export function MonthView({
  onUpdate,
  bookings: appointments,
  mutable = false,
  onUpdateDate,
  start,
  vanity = false,
}: {
  onUpdate?(newBookings: SerializedAppointment[]): void;
  bookings: SerializedAppointment[];
  mutable?: boolean;
  start?: string;
  onUpdateDate?(newDate: string): void;
  vanity?: boolean;
}) {
  let today = startOfToday();
  let [currentMonth, setCurrentMonth] = useState(
    format(start ?? today, "MMM-yyyy")
  );
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let bookings: Appointment[] = appointments.map(deserializeAppointment);

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    let firstDayNextMonth = sub(firstDayCurrentMonth, { months: 1 });
    onUpdateDate && onUpdateDate(firstDayNextMonth.toISOString());
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    onUpdateDate && onUpdateDate(firstDayNextMonth.toISOString());
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let timerRef = useRef<number | null>(null);

  let clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="w-auto min-w-96 h-fit relative">
      <div className="flex items-center">
        {!vanity && (
          <h2 className="flex-auto font-semibold text-primary">
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </h2>
        )}
        {!vanity && (
          <>
            <Button
              type="button"
              variant="text"
              onClick={previousMonth}
              className="-my-1.5 -mr-1.5 ml-2 flex-none p-1.5 rounded-full"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="text"
              onClick={nextMonth}
              className="-my-1.5 -mr-1.5 ml-2 flex-none p-1.5 rounded-full"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </Button>
          </>
        )}
      </div>
      <div
        className={twJoin(
          "grid grid-cols-7 text-xs leading-6 text-center text-muted",
          "mt-10"
        )}
      >
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="relative mt-2">
        <div className="grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <LocalState<Appointment[]>
              key={`${day.toDateString()} ${currentMonth} ${Date.now()}`}
              initialState={bookings.filter((v) =>
                isSameDay(v.appointment_time, day)
              )}
            >
              {(state, setState) => (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDragExit={clear}
                  onMouseUp={clear}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    clear();

                    let func = isSunday(day)
                      ? previousMonth
                      : isSaturday(day)
                      ? nextMonth
                      : null;

                    if (func) {
                      setTimeout(() => {
                        timerRef.current = setTimeout(
                          func as TimerHandler,
                          950
                        );
                      }, 5);
                    }
                  }}
                  onDragLeave={clear}
                  onDrop={(e) => {
                    clear();
                    let id = e.dataTransfer.getData("text/plain");

                    let newAppointments = bookings.filter((a) => a.id != id);

                    let app = bookings.find((a) => a.id == id);

                    if (app) {
                      app.appointment_time.setFullYear(
                        day.getFullYear(),
                        day.getMonth(),
                        day.getDate()
                      );
                    }

                    newAppointments["push"](app!);

                    onUpdate &&
                      onUpdate(newAppointments.map(serializeAppointment));

                    setTimeout(
                      setState.bind(null, (state) => [...state, app!]),
                      10
                    );
                  }}
                  className={twJoin(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "border-faint border-t h-36 overflow-hidden",
                    dayIdx % 7 != 6 && "border-r"
                  )}
                >
                  <time
                    className={twMerge(
                      "flex items-center justify-center rounded-full w-fit ml-auto text-subtle mt-2 mr-2 px-1",
                      !isSameMonth(day, firstDayCurrentMonth) && "text-muted",
                      isEqual(day, today) &&
                        "bg-destructive hover:bg-destructive text-white font-semibold"
                    )}
                    dateTime={format(day, "yyyy-MM-dd")}
                  >
                    {format(day, "d")}
                  </time>
                  {state.map((v) => (
                    <MonthViewEvent
                      key={v.id}
                      mutable={mutable}
                      appointment={{
                        ...v,
                        appointment_time: v.appointment_time.toString(),
                      }}
                    />
                  ))}
                </div>
              )}
            </LocalState>
          ))}
        </div>
      </div>
    </div>
  );
}

function MonthViewEvent({
  appointment,
  mutable,
}: Pick<EventProps, "appointment" | "mutable">) {
  let color;

  switch (appointment.status) {
    case "AWAITING":
      color = "bg-warn";
      break;
    case "ACCEPTED":
      color = "bg-green-500";
      break;
    case "REJECTED":
      color = "bg-destructive";
      break;
    default:
      color = "bg-warn";
      break;
  }

  return (
    <div
      draggable={mutable}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", appointment.id);
      }}
      className="w-full pl-1 flex cursor-crosshair"
    >
      <div className={twJoin("rounded-full size-1.5 my-auto", color)} />
      <span className="text-[0.65rem] pointer-events-none ml-1 max-w-full text-ellipsis overflow-hidden whitespace-nowrap select-none">
        {format(appointment.appointment_time, "p")}
        {" - "}
        {format(
          add(appointment.appointment_time, { minutes: appointment.slot }),
          "p"
        )}
      </span>
    </div>
  );
}

export function MonthViewSkeleton() {
  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(new Date())),
    end: endOfWeek(endOfMonth(new Date())),
  });

  return (
    <div className="w-auto min-w-96 h-fit relative">
      <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-muted animate-pulse">
          January 2020
        </h2>
        <Button
          type="button"
          variant="text"
          className="-my-1.5 -mr-1.5 ml-2 flex-none p-1.5 rounded-full"
          disabled
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="size-5" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="text"
          className="-my-1.5 -mr-1.5 ml-2 flex-none p-1.5 rounded-full"
          disabled
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="size-5" aria-hidden="true" />
        </Button>
      </div>
      <div
        className={twJoin(
          "grid grid-cols-7 text-xs leading-6 text-center text-muted",
          "mt-10"
        )}
      >
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="relative mt-2">
        <div className="grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={dayIdx}
              className={twJoin(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "border-faint border-t h-36 overflow-hidden",
                dayIdx % 7 != 6 && "border-r"
              )}
            >
              <div className="ml-auto w-3 m-2 h-4 bg-faint animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WeekviewSkeleton() {
  let hours = eachHourOfInterval({
    start: startOfToday(),
    end: endOfToday(),
  });

  let days = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  });

  return (
    <div>
      <div className="flex">
        <h2 className="flex-auto font-semibold text-muted animate-pulse">
          January 2020
        </h2>
        <Button className="rounded-full ml-auto" variant="text" disabled>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button className="rounded-full" variant="text" disabled>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
      <div className="flex min-h-[80rem] h-screen w-auto mt-10">
        <div className="flex flex-col w-fit -translate-y-[2.08%] mr-1">
          <div className="h-[40px]" />
          {hours.map((hour) => (
            <time
              key={hour.getHours()}
              className="w-[50px] flex-1 text-right overflow-hidden text-xs text-muted flex justify-end items-center font-light"
              dateTime={format(hour, "h a")}
            >
              {format(hour, "h a")}
            </time>
          ))}
        </div>
        <div className="relative w-full flex">
          {days.map((day, daysIndex) => (
            <div
              className="flex flex-col flex-1 overflow-hidden"
              key={day.toDateString()}
              onMouseEnter={() => {}}
            >
              <div className="grid backdrop-blur-xl sticky top-0 h-10 bg-faint/50 animate-pulse">
                <Line className="w-full place-self-end" />
              </div>
              <div className="flex flex-col flex-1 relative">
                {hours.map((_, hoursIndex) => (
                  <div
                    className={twJoin(
                      "flex-auto border-faint",
                      daysIndex != 0 && "border-l",
                      hoursIndex != 0 && "border-t"
                    )}
                    key={`${daysIndex}, ${hoursIndex}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
