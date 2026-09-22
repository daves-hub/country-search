# City Search — Autocomplete Component

A typeahead/autocomplete search component built with **Next.js 16**, **React 19**, and **TypeScript** as a screening task for [Expert Listing](https://expertlisting.ng).

Queries the [countries.dev](https://countries.dev) cities API as the user types, displaying results in an accessible dropdown with full keyboard navigation.

## Features

- **Debounced input**: 300ms debounce prevents excessive API calls while typing
- **Loading / empty / error states**: clear visual feedback at every stage, including the debounce gap
- **Keyboard navigation**: Arrow keys, Enter, and Escape handled via [Base UI](https://base-ui.com) Autocomplete primitives (WAI-ARIA combobox pattern)
- **Out-of-order / stale response handling**: `AbortSignal` passed to `fetch` cancels in-flight requests when a newer query is issued, preventing race conditions
- **No redundant fetches**: selecting an item updates the input but does not trigger a new API call

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React Query](https://tanstack.com/query) for server state management
- [Base UI](https://base-ui.com) + [shadcn/ui](https://ui.shadcn.com) for accessible, unstyled primitives
- [Tailwind CSS v4](https://tailwindcss.com)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Write-up

See [WRITEUP.md](./WRITEUP.md) for the 150–300 word response covering tradeoffs, scaling, and testing.
