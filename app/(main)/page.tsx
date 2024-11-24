import { LinkButton } from "@/app/components/button";
import { MonthView, WeekView } from "@/app/components/calendar";
import { Select } from "@/app/components/form";
import { Line } from "@/app/components/line";
import { GenericHeader, Headline, Small, Subtle } from "@/app/components/text";
import { startOfDay } from "date-fns";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export let metadata: Metadata = {
  title: "Batse",
  description: "The simplest way create & manage booking.",
};

let Client = dynamic(() => import("@/app/(main)/client"), {
  ssr: false,
  loading() {
    return (
      <section className="bg-background relative h-[40rem] py-4">
        <p className="text-7xl lg:text-[11rem] font-bold mx-auto text-left">
          Book appointments online.
        </p>
        <p className="text-5xl font-medium text-left text-subtle pb-2">
          The simple way to manage appointments & share booking links.
        </p>
      </section>
    );
  },
});

let CalendarMonth = dynamic(
  () => import("@/app/(main)/calendar").then((mod) => mod.CalendarMonth),
  { ssr: false }
);

let CalendarWeek = dynamic(
  () => import("@/app/(main)/calendar").then((mod) => mod.CalendarWeek),
  { ssr: false }
);

export default function () {
  return (
    <main className="px-2">
      <Client />
      <section className="min-h-screen from-faint/35 bg-[radial-gradient(at_top,rgb(var(--faint)_/_0.5),transparent,transparent)] to-transparent my-20 p-4 border-t border-faint">
        <Headline className="font-semibold text-base text-center text-subtle">
          BUILT FOR BUSINESS
        </Headline>
        <GenericHeader h2 className="text-center text-5xl mt-5 font-semibold">
          Start accepting bookings{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-fuchsia-500">
            today.
          </span>
        </GenericHeader>
        <Subtle className="text-center mt-2 text-lg">
          Our software is designed for ease of use and quickness.
        </Subtle>
        <div className="grid lg:grid-cols-3 w-full gap-8 my-12 h-fit *:bg-background/45 *:backdrop-blur *:shadow-sm *:border *:border-faint *:rounded-3xl *:p-2">
          <div>
            <div className="flex">
              <div className="m-2 h-24 mb-4">
                <GenericHeader h2>Schedule</GenericHeader>
                <Subtle>
                  Have customers book with you online using a calendar.
                </Subtle>
              </div>
              <LinkButton
                className="ml-auto py-0 px-2 h-fit w-fit rounded-full"
                variant="text"
                href="/book/benawad"
              >
                See <span className="text-xl font-thin ml-1.5">&rsaquo;</span>
              </LinkButton>
            </div>
            <div className="w-full h-64 border border-faint rounded-3xl bg-faint/20 relative overflow-hidden">
              <div className="absolute inset-0 h-full w-full bg-background bg-[radial-gradient(rgb(var(--faint)/1)_1px,transparent_1px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
              <div className="absolute z-20 left-28 top-2 right-2 border border-faint rounded-xl bg-background p-2 overflow-hidden">
                <div className="scale-75 -translate-y-40">
                  <GenericHeader className="leading-tight" h2>
                    Book appointment with _
                  </GenericHeader>
                  <Subtle className="mb-4">
                    We'll send you an email once your appointment has been
                    scheduled.
                  </Subtle>
                  <WeekView
                    start={startOfDay(new Date(2013, 8, 5)).toISOString()}
                    bookings={[]}
                  />
                </div>
              </div>
              <div className="absolute opacity-55 z-10 left-2 top-10 right-16 border border-faint rounded-xl bg-background p-2 overflow-hidden">
                <div className="scale-75 -translate-y-40">
                  <GenericHeader className="leading-tight" h2>
                    Book appointment with _
                  </GenericHeader>
                  <Subtle className="mb-4">
                    We'll send you an email once your appointment has been
                    scheduled.
                  </Subtle>
                  <WeekView
                    start={startOfDay(new Date(2025, 4, 14)).toISOString()}
                    bookings={[]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="m-2 h-24 mb-4">
              <GenericHeader h2>Manage</GenericHeader>
              <Subtle>
                Manage your incoming appointments — a change will notify your
                customer.
              </Subtle>
            </div>
            <div className="w-full h-64 border border-faint rounded-3xl bg-faint/20 relative overflow-hidden">
              <div className="absolute inset-0 h-full w-full bg-background bg-[radial-gradient(rgb(var(--faint)/1)_1px,transparent_1px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />
              <div className="absolute z-20 left-1/2 top-2 right-2 border border-faint rounded-xl bg-background p-2 overflow-hidden">
                <div className="scale-75 -translate-y-12">
                  <GenericHeader className="mb-4">
                    Upcoming appointments
                  </GenericHeader>
                  <div className="p-4 w-full border-faint border mb-4 rounded-lg">
                    <div className="flex w-full">
                      <p className="text-center w-fit font-semibold">
                        <span className="text-3xl">09</span>
                        <br />
                        <span className="text-subtle font-light">Tues</span>
                      </p>
                      <Line variant="vertical" className="mx-2" />
                      <div className="grid grid-rows-2 items-center">
                        <Small>
                          03:00 AM to 03:30 AM _____@_____.com with ___
                        </Small>
                        <div className="flex gap-x-2 items-center">
                          <Select
                            defaultValue="ACCEPTED"
                            className="font-mono font-light text-primary min-w-28"
                          >
                            <option disabled value="AWAITING">
                              AWAITING
                            </option>
                            <option disabled value="REJECTED">
                              REJECTED
                            </option>
                            <option disabled value="ACCEPTED">
                              ACCEPTED
                            </option>
                          </Select>
                          <div
                            title="ACCEPTED"
                            className={
                              "relative size-fit *:size-2 *:rounded-full *:bg-green-500"
                            }
                          >
                            <div />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Line className="my-2" />
                    <GenericHeader className="text-base font-medium">
                      Description
                    </GenericHeader>
                    <Subtle>
                      Hello, I would like to book and appointment with you.
                    </Subtle>
                  </div>
                  <div className="p-4 w-full border-faint border mb-4 rounded-lg">
                    <div className="flex w-full">
                      <p className="text-center w-fit font-semibold">
                        <span className="text-3xl">09</span>
                        <br />
                        <span className="text-subtle font-light">Tues</span>
                      </p>
                      <Line variant="vertical" className="mx-2" />
                      <div className="grid grid-rows-2 items-center">
                        <Small>
                          03:00 AM to 03:30 AM _____@_____.com with ___
                        </Small>
                        <div className="flex gap-x-2 items-center">
                          <Select
                            defaultValue="ACCEPTED"
                            className="font-mono font-light text-primary min-w-28"
                          >
                            <option disabled value="AWAITING">
                              AWAITING
                            </option>
                            <option disabled value="REJECTED">
                              REJECTED
                            </option>
                            <option disabled value="ACCEPTED">
                              ACCEPTED
                            </option>
                          </Select>
                          <div
                            title="ACCEPTED"
                            className={
                              "relative size-fit *:size-2 *:rounded-full *:bg-green-500"
                            }
                          >
                            <div />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Line className="my-2" />
                  <GenericHeader className="text-base font-medium">
                    Description
                  </GenericHeader>
                  <Subtle>
                    Hello, I would like to book and appointment with you.
                  </Subtle>
                </div>
              </div>
              <div className="absolute z-10 right-[45%] top-4 left-2 border border-faint rounded-xl bg-background p-2 overflow-hidden">
                <div className="scale-75 -translate-y-24">
                  <MonthView
                    start={startOfDay(new Date(2030, 4, 9)).toISOString()}
                    bookings={[
                      {
                        appointment_time: new Date(2030, 4, 4).toISOString(),
                        created_at: "",
                        description: "",
                        email: "",
                        id: "abasbd",
                        slot: 3,
                        status: "ACCEPTED",
                        updated_at: "",
                        worker: "",
                      },
                      {
                        appointment_time: new Date(2030, 4, 5, 7).toISOString(),
                        created_at: "",
                        description: "",
                        email: "",
                        id: "abasbd",
                        slot: 3,
                        status: "AWAITING",
                        updated_at: "",
                        worker: "",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <GenericHeader h2 className="text-left text-5xl mt-48 font-semibold">
          Drag and drop appointments.
        </GenericHeader>
        <Subtle className="text-left text-lg mt-1 mb-14">
          Drag appointments on the far left or right to move between different
          months.
        </Subtle>
        <CalendarMonth />
        <GenericHeader h2 className="text-left text-5xl mt-48 font-semibold">
          Week view included.
        </GenericHeader>
        <Subtle className="text-left text-lg mt-1">
          Change the day and time of day a booking occurs.
        </Subtle>
        <CalendarWeek />
      </section>
      <iframe
        className="mx-auto mt-20 rounded-xl ring-4 ring-faint/70 w-[300px] md:w-[620px] lg:w-[800px] h-[720px] max-w-[1280px]"
        src="https://www.youtube-nocookie.com/embed/aAogiM1il94?si=1ILuDqDipioLn8pf"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <GenericHeader
        h2
        className="text-center text-7xl mt-40 font-semibold mb-10"
      >
        Select your plan.
      </GenericHeader>
      <section
        id="buy"
        className="grid h-[80rem] lg:h-[40rem] lg:grid-cols-3 gap-4 *:shadow-inner *:w-full *:p-4 *:h-full *:border *:border-faint *:rounded-xl mb-40"
      >
        <div className="grid grid-rows-[auto_1fr]">
          <div className="flex items-center w-full gap-x-2">
            <Headline className="font-semibold text-base">ESSENTIALS</Headline>
            <Line className="flex-1" />
          </div>
          <div className="p-4 flex flex-col">
            <GenericHeader h2 className="text-center font-bold text-7xl">
              $70{" "}
              <span className="text-sm text-muted font-medium">/ One time</span>
            </GenericHeader>
            <ul className="mt-10 text-subtle list-disc list-inside">
              <li>Unlimited appointments</li>
              <li>1 to 5 Workers</li>
              <li>Regular support</li>
            </ul>
            <LinkButton href="/signup" className="mt-auto">
              Purchase
            </LinkButton>
          </div>
        </div>
        <div className="grid grid-rows-[auto_1fr]">
          <div className="flex items-center w-full gap-x-2">
            <Headline className="font-semibold text-base">STANDARD</Headline>
            <Line className="flex-1" />
          </div>
          <div className="p-4 flex flex-col">
            <GenericHeader h2 className="text-center font-bold text-7xl">
              $100{" "}
              <span className="text-sm text-muted font-medium">/ One time</span>
            </GenericHeader>
            <ul className="mt-10 text-subtle list-disc list-inside">
              <li>Unlimited appointments</li>
              <li>Up to 20 workers</li>
              <li>Regular support</li>
            </ul>
            <LinkButton href="/signup" className="mt-auto">
              Purchase
            </LinkButton>
          </div>
        </div>
        <div className="grid grid-rows-[auto_1fr]">
          <div className="flex items-center w-full gap-x-2">
            <Headline className="font-semibold text-base text-lime-500 bg-lime-500/20 px-2 rounded-full">
              UNLIMITED
            </Headline>
            <Line className="flex-1" />
          </div>
          <div className="p-4 flex flex-col">
            <GenericHeader h2 className="text-center font-bold text-7xl">
              $145{" "}
              <span className="text-sm text-muted font-medium">/ One time</span>
            </GenericHeader>
            <ul className="mt-10 text-subtle list-disc list-inside">
              <li>Unlimited appointments</li>
              <li>Unlimited Workers</li>
              <li>Premium support</li>
            </ul>
            <LinkButton href="/signup" className="mt-auto">
              Purchase
            </LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}
