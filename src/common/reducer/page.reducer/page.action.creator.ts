import { createAction } from "@reduxjs/toolkit";
import { paginationActions } from "./page.actions.types";
import { PaginationProps } from "./page.reducer";

export const loadCreator = createAction<PaginationProps>(
  paginationActions.load
);

export const restartCreator = createAction(paginationActions.restart);
