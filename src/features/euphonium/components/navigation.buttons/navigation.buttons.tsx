import { useMemo } from "react";
import { usePagination } from "../../../../common/hooks/pagination.hook/use.pagination.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { useEuphonium } from "../../hook/use.euphonium.hook";

import style from "./navigation.buttons.style.module.scss";

export function NavButtons() {
  const repoEuphoniums = useMemo(() => new EuphoniumRepo(), []);
  const { euphoniums } = useEuphonium(repoEuphoniums);

  const { page, nextPage, prevPage } = usePagination();

  const showLessHandler = () => {
    prevPage();
  };

  const showMoreHandler = () => {
    nextPage();
  };

  return (
    <>
      {euphoniums.length > 0 && page.currentPage > 1 && (
        <button className={style.navBtn} onClick={showLessHandler}>
          Anterior
        </button>
      )}

      {euphoniums.length > 0 && euphoniums.length === 4 && (
        <button className={style.navBtn} onClick={showMoreHandler}>
          Siguiente
        </button>
      )}
    </>
  );
}
