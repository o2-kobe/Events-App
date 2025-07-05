"use client";

import SearchBox from "../(components)/SearchBox";
import SearchResults from "../(components)/SearchResults";
import { InstantSearch } from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";

import React from "react";
import EventsFilter from "../(components)/EventsFilter";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || ""
);

export default function Events() {
  return (
    <div className="container mx-auto p-4 mt-15">
      <InstantSearch indexName="events" searchClient={searchClient}>
        <div className="flex flex-col md:flex-row items-start gap-6 w-full">
          <EventsFilter />
          <div className="flex-1 flex flex-col items-center gap-6 w-full">
            <h1 className="text-4xl font-bold text-center text-gray-800 w-full">
              Events
            </h1>
            <SearchBox />
            <SearchResults />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
