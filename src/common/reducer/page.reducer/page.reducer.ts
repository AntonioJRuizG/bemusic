import { createReducer } from "@reduxjs/toolkit";
import * as ac from "./page.action.creator";

export type PaginationProps = {
  currentPage: number;
};

const initialState = {
  currentPage: 1,
} as PaginationProps;

export const paginationReducer = createReducer(initialState, (builder) => {
  builder.addCase(ac.loadCreator, (_state, { payload }) => payload);
  builder.addCase(ac.restartCreator, (_state) => initialState);
  builder.addDefaultCase((state) => state);
});
