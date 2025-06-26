"use client";

import UpcomingEvents from "../components/UpcomingEvents";
import PastEvents from "../components/PastEvents";
import SearchBox from "../components/SearchBox";
import SearchResults from "../components/SearchResults";
import { Hits, InstantSearch } from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || ""
);

export default function Events() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Events
      </h1>
      <InstantSearch indexName="events" searchClient={searchClient}>
        <div className="flex flex-col items-center gap-6">
          <SearchBox />
          <SearchResults />
        </div>
      </InstantSearch>

      {/* Upcoming Events */}
      {/* <h2 className="text-3xl font-semibold mb-5 ml-9 text-primary-blue">
        Upcoming Events
      </h2>
      <UpcomingEvents /> */}

      {/* Past Events */}
      {/* <h2 className="text-3xl font-semibold mb-5 ml-9 text-gray-500">
        Past Events
      </h2>
      <PastEvents /> */}
    </div>
  );
}
