import { Line } from "@/app/components/line";

export default function () {
  return (
    <>
      <p className="text-muted text-sm">NOV 24, 2024</p>
      <h1 className="text-4xl font-semibold">
        How many appointments are booked a day around the globe?
      </h1>
      <Line className="my-4" />
      <p className="text-justify">
        When I was estimating the total number of daily bookings across all
        scheduling software, it was challenging due to the diversity and scale
        of platforms globally. However, here's the rough math formula I used to
        get an educated guess assuming every user makes an average of one
        booking per day.
      </p>
      <pre className="font-serif font-thin my-4 p-2 rounded-lg">
        <span className="text-5xl my-2">∑</span>
        users * 1<sub>/day</sub>
      </pre>
      <p className="text-justify">
        After subsituting the numbers in and summing them here are the stats.
      </p>
      <ul className="*:list-disc *:list-inside *:marker:text-subtle mt-4">
        <li>
          The estimated number of appointments is{" "}
          <strong>200 million per day</strong>
        </li>
        <li>
          This accounts for a combined revenue of{" "}
          <strong>15 billion per day</strong> from these appointments
        </li>
        <li>
          There are <strong>50 million</strong> businesses accepting
          appointments a day
        </li>
      </ul>
    </>
  );
}
