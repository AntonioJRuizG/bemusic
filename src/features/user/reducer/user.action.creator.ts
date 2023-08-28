import { createAction } from "@reduxjs/toolkit";
import { UserResponseBody } from "../model/user.model";
import { usersActions } from "./user.actions.types";

export const loadCreator = createAction<UserResponseBody>(usersActions.load);
export const deleteCreator = createAction<UserResponseBody>(
  usersActions.delete
);
