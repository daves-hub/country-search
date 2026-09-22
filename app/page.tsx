"use client";

import { useState } from "react";
import { CitySelector } from "@/components/city-selector";

export default function Home() {
  const [city, setCity] = useState("");
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center gap-4 py-24 px-8 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          City Search
        </h1>

        <div className="w-full">
          <CitySelector value={city} onChange={setCity} />
        </div>

        {city && (
          <p className="text-gray-700 dark:text-gray-300">
            Selected City: <span className="font-medium">{city}</span>
          </p>
        )}
      </main>
    </div>
  );
}
