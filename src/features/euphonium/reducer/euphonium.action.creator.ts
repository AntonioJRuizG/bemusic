import { createAction } from "@reduxjs/toolkit";
import { EuphoniumProps } from "../model/euphonium.model";
import { euphoniumActions } from "./euphonium.actions.types";

export const loadCreator = createAction<EuphoniumProps[]>(
  euphoniumActions.load
);
export const addCreator = createAction<EuphoniumProps>(euphoniumActions.add);
export const addListCreator = createAction<EuphoniumProps[]>(
  euphoniumActions.addList
);
export const updateCreator = createAction<EuphoniumProps>(
  euphoniumActions.update
);
export const deleteCreator = createAction<EuphoniumProps["id"]>(
  euphoniumActions.delete
);
export const clearCreator = createAction<EuphoniumProps[]>(
  euphoniumActions.clear
);
