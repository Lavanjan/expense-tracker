import type { Expense, PendingExpense } from "../types/types";

export function applyPending(expenses: Expense[], pending: PendingExpense[]) {
  let data = expenses;

  pending.forEach((p) => {
    data = data.filter((exp) => exp.id !== p.expense.id);
    if (p.type !== "delete") data = [...data, p.expense];
  });
  return data;
}
