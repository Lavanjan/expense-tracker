import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PendingExpense } from "../types/types";
import { PENDING_DB } from "../constants/constants";

type Props = {
  isOnline: boolean;
  isSyncing: boolean;
  pending: PendingExpense[];
};

const initialState: Props = {
  isOnline: navigator.onLine,
  isSyncing: false,
  pending: JSON.parse(localStorage.getItem(PENDING_DB) || "[]"),
};

const offlineSlice = createSlice({
  name: "offlineSlice",
  initialState,
  reducers: {
    setOnline: (state, action) => {
      state.isOnline = action.payload;
    },
    setSyncing: (state, action) => {
      state.isSyncing = action.payload;
    },
    setPending: (state, action: PayloadAction<PendingExpense>) => {
      state.pending.push(action.payload);
    },
    removePending: (state, action) => {
      state.pending = state.pending.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setOnline, setSyncing, setPending, removePending } =
  offlineSlice.actions;
export default offlineSlice.reducer;
