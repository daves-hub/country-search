import { LoaderIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteStatus,
} from "@/components/ui/autocomplete";
import { getCities } from "@/lib/api";
import { useDebounce } from "@/lib/use-debounce";

interface CitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CitySelector({ value, onChange }: CitySelectorProps) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const {
    data: cities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cities", debouncedSearch],
    queryFn: ({ signal }) => getCities(debouncedSearch, 20, signal),
    enabled: !!debouncedSearch && debouncedSearch !== value,
    retry: false,
  });

  let status: ReactNode = null;
  const isDebouncing = search !== debouncedSearch;

  if (isDebouncing || isLoading) {
    status = (
      <div className="flex items-center gap-2">
        <HugeiconsIcon icon={LoaderIcon} className="size-4 animate-spin" />
        Searching cities...
      </div>
    );
  } else if (error) {
    status = error.message || "Failed to fetch cities. Please try again.";
  } else if (cities && cities?.length === 0 && debouncedSearch) {
    status = `No cities found for "${debouncedSearch}"`;
  } else if (cities && cities?.length > 0) {
    status = `${cities.length} cit${cities.length === 1 ? "y" : "ies"} found`;
  }

  const shouldRenderPopup = search !== "";

  return (
    <Autocomplete
      items={cities ?? []}
      value={search}
      onValueChange={(newValue, details) => {
        setSearch(newValue);
        if (details.reason === "item-press") {
          onChange(newValue);
        }
      }}
      itemToStringValue={(val) => `${val.name}, ${val.countryCode}`}
      filter={null}
    >
      <AutocompleteInput
        placeholder="Search for a city..."
        showClear
        showTrigger
        onChange={(e) => setSearch(e.target.value)}
      />
      {shouldRenderPopup && (
        <AutocompleteContent>
          <AutocompleteStatus>{status}</AutocompleteStatus>
          <AutocompleteList>
            {(city) => (
              <AutocompleteItem key={city.geonameId} value={city}>
                <div className="flex flex-col">
                  <span className="font-medium">{city.name}</span>
                  <span className="text-xs text-gray-500">
                    {city.countryCode}: Pop - {city.population.toLocaleString()}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      )}
    </Autocomplete>
  );
}
