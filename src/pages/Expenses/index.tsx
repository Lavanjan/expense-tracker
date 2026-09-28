import { useState } from "react";
import { PageLayout } from "../../components/templates/PageLayout/index.tsx";
import type { Expense } from "../../types/types.ts";
import { Header } from "../../components/organisms/Header/index.tsx";
import { ExpenseList } from "../../components/organisms/ExpenseList/index.tsx";
import { useExpenses } from "../../hooks/useExpenses";
import { Button } from "../../components/atoms/Button/index.tsx";
import { FilterBar } from "../../components/molecules/FilterBar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFilters } from "../../store/filterSlice";
import { ExpenseModalForm } from "../../components/organisms/ExpenseModalForm/index.tsx";
import { useExpenseMutations } from "../../hooks/useExpenseMutation";
import { Message } from "../../components/atoms/Message";
import { Center } from "./style";

export function ExpensesPage() {
  const {
    expenses,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
    refetch,
  } = useExpenses();
  const { addExpense, updateExpense, deleteExpense } = useExpenseMutations();

  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);

  const openModal = (expense: Expense | null) => {
    setShowForm(true);
    setEditing(expense);
  };

  const handleDelete = (expense: Expense) => {
    if (window.confirm(`Are you ${expense.title} ?`)) deleteExpense(expense);
  };

  return (
    <PageLayout>
      <Header onAdd={() => openModal(null)} />
      <FilterBar
        filters={filters}
        onChange={(value) => dispatch(setFilters(value))}
      />

      {isLoading && <Message>Loading expenses...</Message>}
      {isError && expenses.length === 0 && (
        <Message>
          Could not load expenses{" "}
          <Button onClick={() => refetch()}>Try again</Button>{" "}
        </Message>
      )}
      {!isLoading && !(isError && expenses.length === 0) && (
        <ExpenseList
          expenses={expenses}
          onEdit={openModal}
          onDelete={handleDelete}
        />
      )}

      {hasNextPage && (
        <Center>
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading" : "Load More"}
          </Button>
        </Center>
      )}

      {showForm && (
        <ExpenseModalForm
          onClose={() => setShowForm(false)}
          onSave={(expense) =>
            editing ? updateExpense(expense) : addExpense(expense)
          }
          expense={editing}
        />
      )}
    </PageLayout>
  );
}
