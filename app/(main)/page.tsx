import { CalendarMonth, CalendarWeek } from "@/app/(main)/calendar";
import { LinkButton } from "@/app/components/button";
import { Line } from "@/app/components/line";
import { GenericHeader, Headline, Subtle } from "@/app/components/text";
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
      <section className="bg-background relative py-4 h-fit">
        <p className="text-2xl font-thin text-left">Batse</p>
        <p className="text-7xl lg:text-9xl font-bold mx-auto text-left">
          Book appointments online.
        </p>
        <Line className="my-4" dotted />
        <p className="text-5xl font-medium text-left text-subtle pb-2">
          The simple way to manage appointments & share booking links.
        </p>
      </section>
    );
  },
});

export default function () {
  return (
    <main className="px-2">
      <Client />
      {/* <Headline className="text-subtle text-right">
        The <span className="text-primary">simplest</span> way to manage
        appointments.
      </Headline>

      <LinkButton
        href="/signup"
        className="font-medium text-lg w-fit ml-auto my-10 p-5 rounded-xl items-center"
      >
        Sign up <ChevronRight className="size-5" />
      </LinkButton>

      <WeekView mutable bookings={bookings} /> */}

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
        <div className="grid grid-cols-2 gap-x-4 mt-16">
          <div>
            <GenericHeader h2 className="text-left text-2xl font-semibold">
              On your end
            </GenericHeader>
            <ul className="mx-20 list-disc list-inside text-subtle text-lg">
              <li>
                Share an appointment link & have customers schedule
                appointments.
              </li>
              <li>Create and manage employee profiles.</li>
              <li>Accept or reject incoming appointments.</li>
              <li>See and move your appointments around on a calendar.</li>
            </ul>
          </div>
          <div>
            <GenericHeader h2 className="text-left text-2xl mt-5 font-semibold">
              On your customers end
            </GenericHeader>
            <ul className="mx-20 list-disc list-inside text-subtle text-lg">
              <li>Create appointments online.</li>
              <li>Get an email update upon acceptance.</li>
              <li>Select their choice of time.</li>
            </ul>
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
