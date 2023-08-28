import { createReducer } from "@reduxjs/toolkit";
import { EuphoniumProps } from "../model/euphonium.model";
import * as ac from "./euphonium.action.creator";

const initialState: EuphoniumProps[] = [];

export const euphoniumReducer = createReducer(initialState, (builder) => {
  builder.addCase(ac.loadCreator, (_state, { payload }) => payload);
  builder.addCase(ac.addCreator, (state, { payload }) => [...state, payload]);
  builder.addCase(ac.updateCreator, (state, { payload }) =>
    state.map((item) => (item.id === payload.id ? payload : item))
  );
  builder.addCase(ac.deleteCreator, (state, { payload }) =>
    state.filter((item) => item.id !== payload)
  );

  builder.addCase(ac.clearCreator, (_state) => initialState);

  builder.addCase(ac.addListCreator, (state, { payload }) => [
    ...state,
    ...payload,
  ]);
  builder.addDefaultCase((state) => state);
});
