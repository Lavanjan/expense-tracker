import { createAction, createSlice } from "@reduxjs/toolkit";
import type { Filters } from "../types/types";

const initialState: Filters = {
  category: "All",
  sortBy: "date-desc",
};

export const syncNow = createAction("offline/syncNow");

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;
