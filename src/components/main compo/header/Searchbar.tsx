"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchInput = () => {
  const params = useSearchParams();
  const router = useRouter();
  
  // 💡 1. Track the search string explicitly in local React state
  const currentQuery = params.get("q") || params.get("search") || "";
  const [searchVal, setSearchVal] = useState(currentQuery);

  // 💡 2. Keep state perfectly synchronized if the URL parameter changes externally
  useEffect(() => {
    setSearchVal(currentQuery);
  }, [currentQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          name="search"
          // 💡 3. Changed from defaultValue to value to make it fully controlled
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search articles..."
          className="pl-10 w-48 focus-visible:ring-1"
        />
      </div>
    </form>
  );
};

export default SearchInput;