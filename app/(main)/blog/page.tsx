export default function () {
  return (
    <main className="pt-4">
      <h1 className="text-5xl font-semibold">All blog entries</h1>
      <ul className="*:list-disc *:list-inside *:marker:text-subtle mt-2">
        <li>
          <a href="/blog/appointments-a-day" className="hover:underline">
            How many appointments are booked a day?
          </a>
        </li>
      </ul>
    </main>
  );
}
