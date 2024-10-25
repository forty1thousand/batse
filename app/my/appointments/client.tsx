"use client";
import { Button, LinkButton } from "@/app/components/button";
import {
  MonthView,
  MonthViewSkeleton,
  WeekView,
  WeekviewSkeleton,
} from "@/app/components/calendar";
import { Select } from "@/app/components/form";
import { Line } from "@/app/components/line";
import { LocalState } from "@/app/components/localstate";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@/app/components/tabs";
import { GenericHeader, Small, Subtle } from "@/app/components/text";
import { getMyAppointments, updateAppointments } from "@/app/lib/request";
import { Role, SerializedAppointment, Status } from "@/app/lib/types";
import { useMap } from "@uidotdev/usehooks";
import {
  add,
  endOfMonth,
  format,
  startOfMonth,
  startOfToday,
  sub,
} from "date-fns";
import { Check, Plus } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { Fragment, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { twJoin } from "tailwind-merge";

function CalendarView({ role }: { role: Role }) {
  let [month, setMonth] = useState(new Date().toString());

  let [tab, setTab] = useQueryState("view", parseAsInteger.withDefault(0));
  let bookings = useMap<string, SerializedAppointment>();
  let cache = useRef<Map<string, SerializedAppointment[]>>(new Map());

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setTab(0);
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        let key = JSON.stringify([
          sub(startOfMonth(month), { months: 1 }),
          add(endOfMonth(month), { months: 1 }),
        ]);

        let res;

        if (!cache.current.get(key)) {
          res = await getMyAppointments(
            sub(startOfMonth(month), { months: 1 }),
            add(endOfMonth(month), { months: 1 })
          );

          cache.current.set(key, res);
        }

        res?.forEach((app) => {
          if (!bookings.has(app.id)) bookings?.set(app.id, app);
        });

        setLoading(false);
      })();
    } catch {
      setLoading(false);
    }
  }, [month]);

  return (
    <div>
      <TabGroup selectedIndex={tab} onChange={setTab}>
        <TabList className="flex flex-1 mb-4">
          <Tab variant="seethru" className="p-1.5 h-fit rounded-r-none">
            Month
          </Tab>
          <Tab variant="seethru" className="p-1.5 h-fit rounded-l-none">
            Week
          </Tab>
          {role == "NORMAL" ? (
            <LinkButton
              href="/search"
              className="w-fit rounded-full ml-auto"
              variant="text"
            >
              <Plus className="size-4 mr-1 self-center" /> New appointment
            </LinkButton>
          ) : (
            <LocalState initialState={false}>
              {(state, setState) => (
                <Button
                  variant="outline"
                  className="h-7 self-center ml-auto"
                  loading={state}
                  onClick={async () => {
                    setState(true);
                    try {
                      await updateAppointments([...bookings.values()]);
                    } finally {
                      setState(false);
                    }
                  }}
                >
                  Save <Check className="size-4 ml-1" />
                </Button>
              )}
            </LocalState>
          )}
        </TabList>
        <TabPanels>
          <TabPanel>
            {loading ? (
              <MonthViewSkeleton />
            ) : (
              <MonthView
                mutable={role !== "NORMAL"}
                onUpdateDate={setMonth}
                bookings={[...bookings.values()] ?? []}
                onUpdate={(bks) => bks.forEach((bk) => bookings.set(bk.id, bk))}
                start={month}
              />
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <WeekviewSkeleton />
            ) : (
              <WeekView
                mutable={role !== "NORMAL"}
                bookings={[...bookings.values()]}
                onChange={(bks) => bks.forEach((bk) => bookings.set(bk.id, bk))}
                onChangeDate={setMonth}
                start={month}
              />
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}

export default function ({ role }: { role: Role }) {
  let {
    data: bookings,
    isLoading,
    mutate,
  } = useSWR(
    [startOfToday(), add(startOfToday(), { months: 6 })],
    ([start, end]) => getMyAppointments(start, end)
  );

  let sortedBookings = bookings?.slice().sort((a, b) => {
    return (
      new Date(a.appointment_time).getTime() -
      new Date(b.appointment_time).getTime()
    );
  });

  return (
    <div className="flex-1 p-4 md:mx-16">
      <TabGroup>
        <TabList className="flex w-full justify-center gap-x-2">
          <Tab>Overview</Tab>
          <Tab>Calendar</Tab>
        </TabList>
        <Line className="my-4" />
        <TabPanels>
          <TabPanel>
            <GenericHeader className="mb-4">
              Upcoming appointments
            </GenericHeader>
            {isLoading ? (
              <>
                <div className="rounded-lg h-12 w-full bg-faint/50 animate-pulse mb-4" />
                <div className="rounded-lg h-12 w-full bg-faint/50 animate-pulse mb-4" />
                <div className="rounded-lg h-12 w-full bg-faint/50 animate-pulse mb-4" />
              </>
            ) : !sortedBookings?.length ? (
              <Small>No appointments yet!</Small>
            ) : (
              sortedBookings?.map((v, i, a) => (
                <Fragment key={v.id}>
                  {(i == 0 ||
                    format(v.appointment_time, "M") !=
                      format(a[i - 1].appointment_time, "M")) && (
                    <GenericHeader className="m-2 text-xl">
                      {format(v.appointment_time, "MMMM")}
                    </GenericHeader>
                  )}
                  <div className="p-4 w-full border-faint border mb-4 rounded-lg">
                    <div className="flex w-full">
                      <p className="text-center w-fit font-semibold">
                        <span className="text-3xl">
                          {format(v.appointment_time, "dd")}
                        </span>
                        <br />
                        <span className="text-subtle font-light">
                          {format(v.appointment_time, "E")}
                        </span>
                      </p>
                      <Line variant="vertical" className="mx-2" />
                      <div className="grid grid-rows-2 items-center">
                        <Small>
                          {format(v.appointment_time, "hh:mm a")} to{" "}
                          {format(
                            add(v.appointment_time, { minutes: v.slot }),
                            "hh:mm a"
                          )}{" "}
                          {v.email} with {v.worker}
                        </Small>
                        <div className="flex gap-x-2 items-center">
                          <Select
                            onChange={async (e: {
                              target: { value: string };
                            }) => {
                              let newAppointment = {
                                ...v,
                                status: e.target.value as Status,
                              };

                              mutate(
                                sortedBookings
                                  ? sortedBookings
                                      .filter((b) => b.id != v.id)
                                      .concat(newAppointment)
                                  : []
                              );

                              await updateAppointments([newAppointment]);
                              await new Promise((res) => setTimeout(res, 500));

                              mutate(
                                sortedBookings
                                  ? sortedBookings
                                      .filter((b) => b.id != v.id)
                                      .concat(newAppointment)
                                  : []
                              );
                            }}
                            defaultValue={v.status}
                            className="font-mono font-light text-primary min-w-28"
                          >
                            <option value="AWAITING">AWAITING</option>
                            <option value="REJECTED">REJECTED</option>
                            <option value="ACCEPTED">ACCEPTED</option>
                          </Select>
                          <div
                            title={v.status}
                            className={twJoin(
                              "relative size-fit *:size-2 *:rounded-full",
                              {
                                ACCEPTED: "*:bg-green-500",
                                AWAITING: "*:bg-warn",
                                REJECTED: "*:bg-destructive",
                              }[v.status]
                            )}
                          >
                            <div />
                            <div
                              className={twJoin(
                                "absolute top-0",
                                v.status == "AWAITING" && "animate-ping"
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Line className="my-2" />
                    <GenericHeader className="text-base font-medium">
                      Description
                    </GenericHeader>
                    <Subtle>{v.description}</Subtle>
                  </div>
                </Fragment>
              ))
            )}
          </TabPanel>
          <TabPanel as={() => <CalendarView role={role} />} />
        </TabPanels>
        {/* <CalendarView role={role} /> */}
      </TabGroup>
    </div>
  );
}
