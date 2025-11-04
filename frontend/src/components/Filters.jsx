import React, { useMemo } from "react";
import Input from "./ui/input";
import Button from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Filters({ products, filters, onChange, onClear }) {
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || "Uncategorized"));
    return ["all", ...[...set].sort()];
  }, [products]);

  const categoryLabel = categories.find((c) => c === filters.category) ?? "all";
  const ratingLabel = `${filters.minRating || 0}+ stars`;

  return (
    <div className="grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-6">
      <Input
        value={filters.q}
        onChange={(e) => onChange({ ...filters, q: e.target.value })}
        placeholder="Search title, brand, category"
        className="col-span-2"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-9 w-full justify-between px-3">
            {categoryLabel}
            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full">
          {categories.map((c) => (
            <DropdownMenuItem
              key={c}
              onSelect={() => onChange({ ...filters, category: c })}
            >
              {c}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex gap-2">
        <Input
          type="number"
          inputMode="decimal"
          value={filters.minPrice}
          onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
          placeholder="Min $"
          className="w-1/2"
        />
        <Input
          type="number"
          inputMode="decimal"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
          placeholder="Max $"
          className="w-1/2"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-9 w-full justify-between px-3">
            {ratingLabel}
            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <DropdownMenuItem
              key={n}
              onSelect={() => onChange({ ...filters, minRating: String(n) })}
            >
              {n}+ stars
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        className="h-9 w-full"
        onClick={
          onClear ||
          (() =>
            onChange({
              q: "",
              category: "all",
              minPrice: "",
              maxPrice: "",
              minRating: "0",
            }))
        }
      >
        Clear
      </Button>
    </div>
  );
}
