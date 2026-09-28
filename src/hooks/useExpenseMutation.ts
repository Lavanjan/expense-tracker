import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense, deleteExpense, updateExpense } from "../api/expenseApi";
import type { Expense } from "../types/types";
import { useAppDispatch } from "../store/hooks";
import { setPending } from "../store/offlineSlice";
import { v4 as uuidv4 } from "uuid";

export function useExpenseMutations() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const invalidateQuery = () =>
    queryClient.invalidateQueries({ queryKey: ["expenses"] });

  const addMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: invalidateQuery,
    onError: (_err, expense) => {
      dispatch(setPending({ id: uuidv4(), type: "create", expense }));
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateExpense,
    onSuccess: invalidateQuery,
    onError: (_err, expense) => {
      dispatch(setPending({ id: uuidv4(), type: "update", expense }));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: invalidateQuery,
    onError: (_error, expense) => {
      dispatch(setPending({ id: uuidv4(), type: "delete", expense }));
    },
  });

  return {
    addExpense: (expense: Expense) => addMutation.mutate(expense),
    updateExpense: (expense: Expense) => updateMutation.mutate(expense),
    deleteExpense: (expense: Expense) => deleteMutation.mutate(expense),
  };
}
