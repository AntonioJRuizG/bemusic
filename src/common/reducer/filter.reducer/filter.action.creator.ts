import { createAction } from "@reduxjs/toolkit";
import { filterActions } from "./filter.actions.types";
import { FilterProps } from "./filter.reducer";

export const loadCreator = createAction<FilterProps>(filterActions.load);

export const clearCreator = createAction(filterActions.clear);
