import { useDispatch, useSelector } from "react-redux";
import * as ac from "../../reducer/page.reducer/page.action.creator";
import { AppDispatch, RootState } from "../../../store/store";

export function usePagination() {
  const page = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch<AppDispatch>();

  const nextPage = () => {
    const newPage = page.currentPage + 1;
    const nextPage = {
      currentPage: newPage,
    };
    dispatch(ac.loadCreator(nextPage));
  };

  const prevPage = () => {
    const newPage = page.currentPage - 1;
    const prevPage = {
      currentPage: newPage,
    };
    dispatch(ac.loadCreator(prevPage));
  };

  const loadCurrentPage = () => {
    const currentPage = {
      currentPage: page.currentPage,
    };
    dispatch(ac.loadCreator(currentPage));
  };

  const restartPagination = () => {
    dispatch(ac.restartCreator());
  };

  return { page, nextPage, prevPage, restartPagination, loadCurrentPage };
}
