export async function getCountries(
  search: string = "",
  country: string = "",
  limit: number = 10,
) {
  const response = await fetch(
    `https://countries.dev/cities?q=${search}&country=${country}&limit=${limit}`,
    {
      method: "GET",
    },
  );
  return response.json();
}
