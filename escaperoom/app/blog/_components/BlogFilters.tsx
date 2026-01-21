"use client";

import { useQueryState, parseAsInteger } from "nuqs";

interface BlogFiltersProps {
  users: { id: number; name: string }[];
  currentUserId: number;
}

export function BlogFilters({ users, currentUserId }: BlogFiltersProps) {
  const [userId, setUserId] = useQueryState(
    "userId",
    parseAsInteger.withDefault(0).withOptions({ shallow: false })
  );
  const [, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false })
  );

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserId = Number.parseInt(event.target.value);
    setUserId(newUserId === 0 ? null : newUserId);
    setPage(1); // Reset to first page when filtering
  };

  const clearFilter = () => {
    setUserId(null);
    setPage(1);
  };

  return (
<div className="mb-8 flex flex-wrap items-center gap-4">
  <div className="flex items-center gap-2">
    <label htmlFor="user-filter" className="text-white text-sm font-medium">
      Filter by author:
    </label>
    <select
      id="user-filter"
      value={userId.toString()}
      onChange={handleUserChange}
      className="w-[200px] rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <option value="0">All authors</option>
      {users.map((user) => (
        <option key={user.id} value={user.id.toString()}>
          {user.name}
        </option>
      ))}
    </select>
  </div>

  {currentUserId > 0 && (
    <button
      onClick={clearFilter}
      className="inline-flex items-center gap-1 rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
      Clear filter
    </button>
  )}
</div>

  );
}