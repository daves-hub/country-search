# Write-up

## Tradeoffs

I chose **React Query** over a raw `useEffect` + `useState` approach for data fetching. React Query gives me automatic caching, if a user searches "Lagos", deletes it, and types "Lagos" again, the second time is instant from cache with no network request. It also provides clean access to loading, error, and success states without manually juggling boolean flags. The tradeoff is adding a dependency, but for any app with meaningful data fetching, it removes a lot of fragile boilerplate.

For the autocomplete UI, I used **Base UI's Autocomplete primitives** (via shadcn) rather than building keyboard navigation and ARIA attributes from scratch. This gives me WAI-ARIA combobox compliance: focus management, screen-reader support, arrow key navigation; without having to implement and debug those details myself. The tradeoff is learning a component-specific API, but it eliminates accessibility bugs I'd almost certainly introduce building it by hand.

To prevent race conditions from out-of-order responses, I pass React Query's **`AbortSignal`** directly to `fetch`. When a newer keystroke fires, the previous in-flight request is cancelled at the network level rather than just ignored on arrival. I also normalised the API's 404 plain-text response (for zero results) into an empty array so that "no results" doesn't surface as an error state.

## Scaling and Testing

To harden this for production, I'd explore caching API responses at the edge or CDN level so repeated popular queries don't hit the origin server every time. React Query already handles this on the client, but server-side caching would benefit all users. For testing, I'd focus on simulating core user flows: typing, selecting, clearing; and verifying the right states appear at the right time. This is an area I'm actively growing in and would welcome the opportunity to deepen within the team.
