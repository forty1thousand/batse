export function relative(d1: Date, d2: Date = new Date(), short = false) {
  let rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  let units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  let elapsed = d1.valueOf() - d2.valueOf();

  for (let [u, l] of Object.entries(units))
    if (Math.abs(elapsed) > l || u == "second")
      return (
        `${rtf.format(
          Math.round(elapsed / l),
          u as Intl.RelativeTimeFormatUnit
        )}` +
        (short ? "" : ` at ${d1.toLocaleString("en-US", { hour: "numeric" })}`)
      );
}

export function beautifulDate(d: Date, extra: boolean = false) {
  let bonus = extra ? { hour12: true, hour: "numeric", minute: "numeric" } : {};

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...bonus,
  } as any);
}
