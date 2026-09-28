import { v4 as uuidv4 } from "uuid";
import {
  DB_KEY,
  EXPENSE_AMOUNT,
  EXPENSE_CATEGORIES,
  EXPENSE_TITLES,
  PAGE_SIZE,
} from "../constants/constants";
import type { Expense, Filters } from "../types/types";
import { simulateNetwork } from "../utils/network";

function readDb(): Expense[] {
  const saved = localStorage.getItem(DB_KEY);
  if (saved) {
    return JSON.parse(saved);
  }

  const expenses = Array.from({ length: 50 }, (_, i) => ({
    id: uuidv4(),
    title: EXPENSE_TITLES[i % EXPENSE_TITLES.length],
    amount: EXPENSE_AMOUNT[i % EXPENSE_AMOUNT.length],
    date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
    category: EXPENSE_CATEGORIES[i % EXPENSE_CATEGORIES.length],
  }));
  writeDb(expenses);
  return expenses;
}

function writeDb(expense: Expense[]) {
  localStorage.setItem(DB_KEY, JSON.stringify(expense));
}

export async function getExpenses(page: number, filters: Filters) {
  await simulateNetwork();

  let expenses = readDb();

  if (filters.category !== "All") {
    expenses = expenses.filter(
      (expense) => expense.category === filters.category,
    );
  }

  expenses.sort((a, b) => {
    switch (filters.sortBy) {
      case "amount-asc":
        return a.amount - b.amount;
      case "amount-desc":
        return b.amount - a.amount;
      case "date-asc":
        return a.date.localeCompare(b.date);
      case "date-desc":
        return b.date.localeCompare(a.date);
      default:
        return 0;
    }
  });

  const start = (page - 1) * PAGE_SIZE;
  const items = expenses.slice(start, start + PAGE_SIZE);

  return {
    items,
    nextPage: start + PAGE_SIZE < expenses.length ? page + 1 : undefined,
  };
}

export async function createExpense(expense: Expense) {
  await simulateNetwork();
  writeDb([...readDb(), expense]);
}

export async function updateExpense(expense: Expense) {
  await simulateNetwork();
  const exists = readDb().filter((exp) => exp.id !== expense.id);
  writeDb([...exists, expense]);
}

export async function deleteExpense(expense: Expense) {
  await simulateNetwork();
  writeDb(readDb().filter((exp) => exp.id !== expense.id));
}
