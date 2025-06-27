"use client";

import SearchBox from "../(components)/SearchBox";
import SearchResults from "../(components)/SearchResults";
import { InstantSearch } from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || ""
);

export default function Events() {
  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Events
        </h1>
      </div>

      <InstantSearch indexName="events" searchClient={searchClient}>
        <div className="flex flex-col items-center gap-6">
          <SearchBox />
          <SearchResults />
        </div>
      </InstantSearch>
    </div>
  );
}
