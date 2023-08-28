import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.js";
import { UserProps } from "../model/user.model.js";
import { UserRepo } from "../services/repository/user.repo.js";
import * as ac from "../reducer/user.action.creator";

export function useUsers(repo: UserRepo) {
  const user = useSelector((state: RootState) => state.loggedUser);
  const dispatch = useDispatch<AppDispatch>();

  const regUser = async (user: Partial<UserProps>) => {
    try {
      await repo.registerUser(user);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const logUser = async (user: Partial<UserProps>) => {
    try {
      const userData = await repo.loginUser(user);
      dispatch(ac.loadCreator(userData));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const logoutUser = async () => {
    dispatch(
      ac.deleteCreator({
        user: { id: "", name: "", email: "", password: "" },
        token: "",
      })
    );
  };

  return {
    user,
    regUser,
    logUser,
    logoutUser,
  };
}
