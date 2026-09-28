export type Expense = {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  notes?: string;
};

export type Category = "Food" | "Travel" | "Shopping" | "Other";

export type Filters = {
  category: Category | "All";
  sortBy: "date-asc" | "date-desc" | "amount-asc" | "amount-desc";
};

export type PendingExpense = {
  id: string;
  type: "create" | "update" | "delete";
  expense: Expense;
};
