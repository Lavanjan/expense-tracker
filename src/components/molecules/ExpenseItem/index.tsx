import { memo } from "react";
import type { Expense } from "../../../types/types";
import { Button } from "../../atoms/Button";
import { Actions, Amount, Info, List, SubTitle, Title } from "./styles";

type Props = {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
  pending: boolean;
};

function BaseExpenseItem({ expense, onEdit, onDelete, pending }: Props) {
  return (
    <List>
      <Info>
        <Title>{expense.title}</Title>
        <SubTitle>
          {expense.category} - {expense.date} {pending && "Waiting to Sync..."}
        </SubTitle>
      </Info>
      <Amount>{expense.amount}</Amount>
      <Actions>
        <Button
          aria-label={`Edit ${expense.title}`}
          onClick={() => onEdit(expense)}
        >
          Edit
        </Button>
        <Button
          aria-label={`Delete ${expense.title}`}
          onClick={() => onDelete(expense)}
          $variant="danger"
        >
          Delete
        </Button>
      </Actions>
    </List>
  );
}

export const ExpenseItem = memo(BaseExpenseItem);
