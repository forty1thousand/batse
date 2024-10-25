"use client";

import { useEffect, useState } from "react";

interface PromiseState<T> {
  value: null | T;
  loading: true | false;
}

export function usePromises<T extends Promise<unknown>[] | []>(...ps: T) {
  let [results, setResults] = useState(
    ps.map(() => ({ value: null, loading: true })) as {
      [K in keyof T]: PromiseState<Awaited<T[K]>>;
    }
  );

  useEffect(() => {
    ps.forEach((promise, index) => {
      promise
        .then((result) => {
          setResults((prevResults) => {
            let newResults = [...prevResults];
            // @ts-ignore
            newResults[index] = { value: result, loading: false };
            return newResults as {
              [K in keyof T]: PromiseState<Awaited<T[K]>>;
            };
          });
        })
        .catch(() => {
          setResults(
            // @ts-ignore
            (prevResults) => {
              let newResults = [...prevResults];
              newResults[index] = { value: null, loading: false };
              return newResults;
            }
          );
        });
    });
  }, []);

  return results;
}
