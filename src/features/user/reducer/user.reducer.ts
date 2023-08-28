import { createReducer } from "@reduxjs/toolkit";
import { UserProps } from "../model/user.model";
import * as ac from "./user.action.creator";

const initialState: {
  token: string;
  user: UserProps | null;
} = {
  user: null,
  token: "",
};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(ac.loadCreator, (_state, { payload }) => payload);
  builder.addCase(ac.deleteCreator, (_state) => initialState);
  builder.addDefaultCase((state) => state);
});
