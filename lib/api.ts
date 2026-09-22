export interface City {
  geonameId: number;
  name: string;
  asciiName: string;
  countryCode: string;
  admin1Code: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  featureCode: string;
}

const baseUrl = "https://countries.dev";

export async function getCities(
  search: string = "",
  limit: number = 10,
  signal: AbortSignal,
): Promise<City[]> {
  const params = new URLSearchParams({
    q: search,
    limit: limit.toString(),
  });
  const response = await fetch(`${baseUrl}/cities?${params.toString()}`, {
    signal,
  });
  if (response.ok) {
    return response.json();
  } else if (response.status === 404) {
    return [];
  }
  throw new Error(`Failed to fetch cities: ${response.status}`);
}
