"use client";
import { LinkButton } from "@/app/components/button";
import { Headline, GenericHeader, Subtle } from "@/app/components/text";
import { Line } from "@/app/components/line";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function () {
  let searchParams = useSearchParams();
  let email = searchParams.get("email");

  return (
    <div className="px-2">
      <div className="my-8">
        <GenericHeader className="text-5xl font-semibold">
          Select your plan again.
        </GenericHeader>
        <Subtle className="mt-1">
          Now that you've created your account we can proceed.
        </Subtle>
      </div>
      <section
        id="buy"
        className="grid h-[80rem] lg:h-[40rem] lg:grid-cols-3 gap-4 *:shadow-inner *:w-full *:p-4 *:h-full *:border *:border-faint *:rounded-xl mb-10"
      >
        <div className="grid grid-rows-[auto_1fr]">
          <div className="flex items-center w-full gap-x-2">
            <Headline className="font-semibold text-base">ESSENTIALS</Headline>
            <Line className="flex-1" />
          </div>
          <div className="p-4 flex flex-col">
            <GenericHeader className="text-center font-bold text-7xl">
              $70{" "}
              <span className="text-sm text-muted font-medium">/ One time</span>
            </GenericHeader>
            <ul className="mt-10 text-subtle list-disc list-inside">
              <li>Unlimited appointments</li>
              <li>1 to 5 Workers</li>
              <li>Regular support</li>
            </ul>
            <LinkButton
              href={`https://buy.stripe.com/8wM8yi4QF7Ozc484gi?prefilled_email=${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto"
            >
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
            <GenericHeader className="text-center font-bold text-7xl">
              $100{" "}
              <span className="text-sm text-muted font-medium">/ One time</span>
            </GenericHeader>
            <ul className="mt-10 text-subtle list-disc list-inside">
              <li>Unlimited appointments</li>
              <li>Up to 20 workers</li>
              <li>Regular support</li>
            </ul>
            <LinkButton
              href={`https://buy.stripe.com/28obKu0Ap9WHd8cbIL?prefilled_email=${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto"
            >
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
            <GenericHeader className="text-center font-bold text-7xl">
              $145{" "}
              <span className="text-sm text-muted font-medium">/ One time</span>
            </GenericHeader>
            <ul className="mt-10 text-subtle list-disc list-inside">
              <li>Unlimited appointments</li>
              <li>Unlimited Workers</li>
              <li>Premium support</li>
            </ul>
            <LinkButton
              href={`https://buy.stripe.com/6oEeWGerf7Oz8RWbIJ?prefilled_email=${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto"
            >
              Purchase
            </LinkButton>
          </div>
        </div>
      </section>
      <GenericHeader>Once you've paid go to your profile.</GenericHeader>
      <LinkButton
        href="/my/profile"
        className="text-xl font-medium w-fit items-center my-4"
      >
        My profile{" "}
        <ArrowRight className="size-4 ml-2 stroke-subtle translate-y-[1px]" />
      </LinkButton>
    </div>
  );
}
