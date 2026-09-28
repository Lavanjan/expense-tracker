import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import filters, { syncNow } from "./filterSlice";
import offline, { removePending, setSyncing } from "./offlineSlice";
import { setOnline } from "./offlineSlice";
import { createExpense, deleteExpense, updateExpense } from "../api/expenseApi";
import { PENDING_DB } from "../constants/constants";
import { QueryClient } from "@tanstack/react-query";

const listener = createListenerMiddleware();
const queryClient = new QueryClient();

listener.startListening({
  matcher: isAnyOf(setOnline, syncNow),
  effect: async (_action, api) => {
    const { pending, isSyncing } = (api.getState() as RootState).offline;
    if (!navigator.onLine || isSyncing || pending.length === 0) return;
    api.dispatch(setSyncing(true));
    for (const exp of pending) {
      try {
        if (exp.type === "create") createExpense(exp.expense);
        if (exp.type === "delete") deleteExpense(exp.expense);
        if (exp.type === "update") updateExpense(exp.expense);
        api.dispatch(removePending(exp.id));
      } catch (error) {}
    }
    api.dispatch(setSyncing(false));
    queryClient.invalidateQueries({ queryKey: ["expenses"] });
  },
});

export const store = configureStore({
  reducer: { filters, offline },
  middleware: (getDefault) => getDefault().prepend(listener.middleware),
});

store.subscribe(() => {
  localStorage.setItem(
    PENDING_DB,
    JSON.stringify(store.getState().offline.pending),
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
