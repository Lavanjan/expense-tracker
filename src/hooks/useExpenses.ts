import { useInfiniteQuery } from "@tanstack/react-query";
import { getExpenses } from "../api/expenseApi";
import { useAppSelector } from "../store/hooks";
import { applyPending } from "../utils/expenses";
import { useMemo } from "react";

export function useExpenses() {
  const filters = useAppSelector((state) => state.filters);
  const pending = useAppSelector((state) => state.offline.pending);

  const query = useInfiniteQuery({
    queryKey: ["expenses", filters],
    queryFn: ({ pageParam }) => getExpenses(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: 3,
  });

  const expenses = query.data?.pages.flatMap((page) => page.items) || [];

  const allExpenses = useMemo(() => {
    return applyPending(expenses, pending);
  }, [query.data, pending, filters]);

  return { ...query, expenses: allExpenses };
}
