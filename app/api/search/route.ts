import { db } from "@/app/lib/db";
import { SearchData, omitSensitiveFields } from "@/app/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let { query, page } = (await req.json()) as SearchData;

  query = query.trim();

  if (query === "" || page >= 10000 || page < 0) {
    return NextResponse.json({ res: [] });
  }

  let q = query.split(" ");

  // let res =
  //   await sql<SearchResults>`SELECT * FROM users WHERE search_vector @@ to_tsquery(lower(${q})) AND (role = 'WORKER'::Role OR role = 'OFFICE'::Role) LIMIT ${25} OFFSET ${
  //     25 * page
  //   };`.execute(db);

  let res = await db
    .selectFrom("users")
    .selectAll()
    .where(({ eb, and }) =>
      and(q.map((v) => eb("combined_text", "ilike", `%${v}%`)))
    )
    .where("role", "in", ["OFFICE", "WORKER"])
    .limit(25)
    .offset(page * 25)
    .execute();

  return NextResponse.json({ res: res.map(omitSensitiveFields) });
}
