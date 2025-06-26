import { useSearchBox } from "react-instantsearch";
import React, { useState, useRef, useEffect } from "react";

function SearchBox() {
  const { query, refine, clear } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      refine(inputValue);
    }, 300);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue, refine]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  function handleClear() {
    setInputValue("");
    clear();
    inputRef.current?.focus();
  }

  return (
    <div className="flex items-center gap-2 relative w-full max-w-md">
      <input
        ref={inputRef}
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search events..."
        className="border rounded px-3 py-1 focus:outline-none w-full"
        autoComplete="off"
        spellCheck={false}
        maxLength={512}
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-gray-400 hover:text-gray-700"
          aria-label="Clear search"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBox;
