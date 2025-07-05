"use client";
import { useState } from "react";
import CategoryRefinementList from "../(components)/CategoryRefinementList";
import { BiX } from "react-icons/bi";

export default function EventsFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile: Hamburger button */}
      <button
        className="md:hidden mb-4 text-3xl text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(true)}
        aria-label="Open filters"
      >
        &#9776;
      </button>

      {/* Desktop: Fixed sidebar */}
      <div className="hidden md:block w-60 mb-4 md:mb-0">
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

      {/* Mobile: Overlay sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-opacity-40"
          onClick={() => setIsOpen(false)}
        />
        {/* Sidebar */}
        <aside
          className={`fixed top-8 left-0 h-dvh w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-8 left-1 w-8 h-8 flex items-center justify-center text-gray-700 hover:text-gray-900 focus:outline-none z-10"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <BiX size={32} />
          </button>
          <div className="p-6 pt-12 h-full overflow-y-auto">
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
        </aside>
      </div>
    </>
  );
}
