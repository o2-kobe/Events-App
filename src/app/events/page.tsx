"use client";

import SearchBox from "../(components)/SearchBox";
import SearchResults from "../(components)/SearchResults";
import { InstantSearch } from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import CategoryRefinementList from "../(components)/CategoryRefinementList";
import React from "react";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || ""
);

export default function Events() {
  return (
    <div className="container mx-auto p-4 mt-15">
      <InstantSearch indexName="events" searchClient={searchClient}>
        <div className="flex flex-col md:flex-row items-start gap-6 w-full">
          <div className="w-full md:w-60 mb-4 md:mb-0">
            <div>
              <div className="mb-2 pl-4 font-semibold text-lg text-gray-700 text-center md:text-left">
                Filter by Category
              </div>
              <CategoryRefinementList attribute="category" />
            </div>
            <div className="mt-4">
              <div className="mb-2 pl-4 font-semibold text-lg text-gray-700 text-center md:text-left">
                Filter by Location
              </div>
              <CategoryRefinementList attribute="location" />
            </div>
          </div>
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
