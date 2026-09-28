import type { Filters } from "../../../types/types";
import { Select } from "../../atoms/Input/Input";
import { EXPENSE_CATEGORIES } from "../../../constants/constants";
import { Bar } from "./styles";
import { memo } from "react";

type Props = { filters: Filters; onChange: (value: any) => void };

function BaseFilterBar({ filters, onChange }: Props) {
  return (
    <Bar>
      <Select
        aria-label="Category"
        value={filters.category}
        onChange={(e) => onChange({ category: e.target.value })}
      >
        <option value="All">All Categories</option>
        {EXPENSE_CATEGORIES.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </Select>

      <Select
        aria-label="Sort By"
        value={filters.sortBy}
        onChange={(e) => onChange({ sortBy: e.target.value })}
      >
        <option value="date-desc">Date, New to Old</option>
        <option value="date-asc">Date, Old to New</option>
        <option value="amount-desc">Amount, High to Low</option>
        <option value="amount-asc">Amount, Low to High</option>
      </Select>
    </Bar>
  );
}

export const FilterBar = memo(BaseFilterBar);
