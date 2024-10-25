"use client";
import { Button } from "@/app/components/button";
import { Container } from "@/app/components/container";
import { Face } from "@/app/components/face";
import { F, Input } from "@/app/components/form";
import { Line } from "@/app/components/line";
import { Link } from "@/app/components/link";
import { Loading } from "@/app/components/loading";
import { GenericHeader, Subtle } from "@/app/components/text";
import { getSearchResults } from "@/app/lib/request";
import { SearchResults } from "@/app/lib/types";
import { useDebounce, useList } from "@uidotdev/usehooks";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export default function () {
  let [query, setQuery] = useQueryState("q", parseAsString.withDefault(""));
  let [page, setPage] = useQueryState("p", parseAsInteger.withDefault(0));
  let [results, { set }] = useList<SearchResults[number]>([]);

  let debouncedQuery = useDebounce(query, 300);

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      set(await getSearchResults(debouncedQuery, page));
      setLoading(false);
    })();
  }, [debouncedQuery, page]);

  return (
    <Container className="max-w-4xl px-4">
      <div className="mt-4 flex items-center">
        <Input
          value={query ?? ""}
          autoComplete="false"
          onChange={(e) => setQuery(e.target.value)}
          className="bg-background w-72 rounded-xl p-0 px-3 h-[3.5ch]"
          placeholder="Search"
          type="search"
        />
        <GenericHeader className="ml-auto font-semibold sm:text-3xl md:text-4xl">
          Search results
        </GenericHeader>
      </div>
      <Line className="my-4" />
      <ul className="border border-faint p-4 rounded-md bg-background">
        <div className="flex">
          <span className="text-base">All results ({results.length})</span>
          <Button
            onClick={() => setPage(Math.max(page - 1, 0))}
            disabled={page == 0}
            variant="text"
            className="size-6 rounded-full ml-auto"
          >
            {"<"}
          </Button>
          <span className="text-base mx-1">Page {page + 1}</span>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={results.length == 0}
            variant="text"
            className="size-6 rounded-full"
          >
            {">"}
          </Button>
        </div>
        <Line className="my-2" />
        {loading ? (
          <Loading className="size-4" />
        ) : results.length ? (
          <div className="grid gap-y-2">
            {results.map((worker, i) => (
              <li key={i} className="flex items-center">
                <Face
                  href={`/at/${worker.username}`}
                  name={worker.name ?? worker.username}
                />
                <div className="ml-2">
                  <Link gray href={`/at/${worker.username}`}>
                    {worker.name ?? worker.username}
                  </Link>
                  <Subtle>in {worker.city ?? "The World"}</Subtle>
                  <Subtle className="text-xs text-muted">{worker.tags}</Subtle>
                </div>
              </li>
            ))}
          </div>
        ) : (
          <Subtle>No results</Subtle>
        )}
      </ul>
    </Container>
  );
}
