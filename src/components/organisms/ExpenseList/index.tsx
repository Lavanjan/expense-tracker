import type { Expense } from "../../../types/types";
import { ExpenseItem } from "../../molecules/ExpenseItem";
import { useAppSelector } from "../../../store/hooks";
import { Card, Empty } from "./styles";
import { memo } from "react";

type Props = {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
};

function BaseExpenseList({ expenses, onDelete, onEdit }: Props) {
  if (expenses && expenses.length === 0)
    return <Empty>No Expenses Found!</Empty>;

  const pending = useAppSelector((state) => state.offline.pending);

  const pendingIds = pending.map((p) => p.expense.id);

  return (
    <Card>
      {expenses &&
        expenses.map((expense) => (
          <ExpenseItem
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
            pending={pendingIds.includes(expense.id)}
          />
        ))}
    </Card>
  );
}

export const ExpenseList = memo(BaseExpenseList);
