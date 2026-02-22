"use client";

import { useQueryState, parseAsInteger } from "nuqs";

interface BlogFiltersProps {
  users: { id: number; name: string }[];
  currentUserId: number;
}

export function BlogFilters({
  users,
  currentUserId,
}: BlogFiltersProps) {

  //
  // USER FILTER STATE
  //
  const [userId, setUserId] = useQueryState(
    "userId",
    parseAsInteger.withDefault(0).withOptions({
      shallow: false,
    })
  );

  //
  // PAGE STATE (FOR RESET)
  //
  const [, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
    })
  );

  //
  // CHANGE AUTHOR
  //
  const handleUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {

    const newUserId = Number(event.target.value);

    //
    // SET USER
    //
    if (newUserId === 0) {

      setUserId(null);

    } else {

      setUserId(newUserId);

    }

    //
    // RESET PAGE
    //
    setPage(1);
  };

  //
  // CLEAR FILTER
  //
  const clearFilter = () => {

    setUserId(null);

    setPage(1);
  };

  return (

    <div className="mb-8 flex flex-wrap items-center gap-4">

      {/* SELECT */}

      <div className="flex items-center gap-2">

        <label className="text-white text-sm font-medium">
          Filter by author:
        </label>

        <select
          value={userId ?? 0}
          onChange={handleUserChange}
          className="w-[200px] rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >

          <option value={0}>
            All authors
          </option>

          {users.map((user) => (

            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>

          ))}

        </select>

      </div>

      {/* CLEAR BUTTON */}

      {currentUserId > 0 && (

        <button
          onClick={clearFilter}
          className="
          inline-flex items-center gap-1
          rounded-md bg-purple-600 px-3 py-2
          text-sm font-medium text-white
          hover:bg-purple-700
          "
        >

          Clear filter

        </button>

      )}

    </div>

  );
}