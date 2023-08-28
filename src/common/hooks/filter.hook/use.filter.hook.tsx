import { useDispatch, useSelector } from "react-redux";
import * as ac from "../../reducer/filter.reducer/filter.action.creator";
import { AppDispatch, RootState } from "../../../store/store";

export function useFilter() {
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();

  const loadFilter = (newFilter: string) => {
    const filter = {
      filter: newFilter,
    };
    dispatch(ac.loadCreator(filter));
  };

  const clearFilter = () => {
    dispatch(ac.clearCreator());
  };

  return { filter, loadFilter, clearFilter };
}
