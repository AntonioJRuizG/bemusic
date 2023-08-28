/* eslint-disable react-hooks/exhaustive-deps */
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumProps } from "../../model/euphonium.model";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { LoadingSpin } from "../../../../common/components/loading/loading";
import { Thumbnail } from "../thumbnail/thumbnail";
import { UserRepo } from "../../../user/services/repository/user.repo";
import { useUsers } from "../../../user/hook/use.user.hook";
import { GalleryFilter } from "../filter/filter";
import { useMemo } from "react";

import style from "./gallery.style.module.scss";
import { NavButtons } from "../navigation.buttons/navigation.buttons";

export function Gallery() {
  const repoUser = useMemo(() => new UserRepo(), []);
  const { user } = useUsers(repoUser);

  const repoEuphoniums = useMemo(() => new EuphoniumRepo(), []);
  const { euphoniums, deleteEuphonium } = useEuphonium(repoEuphoniums);

  if (!euphoniums.length) {
    return (
      <div className={style.spin}>
        <LoadingSpin></LoadingSpin>
      </div>
    );
  }

  return (
    <>
      <nav className={style.mainMenu}>
        <GalleryFilter></GalleryFilter>
      </nav>
      <section className={style.gallery}>
        <h1 className={style.galleryTitle}>Galería</h1>
        <ul className={style.galleryList}>
          {euphoniums.map((item: EuphoniumProps) => (
            <li key={item.id} className={style.galleryListItem}>
              <Thumbnail
                item={item}
                deleteEuphonium={deleteEuphonium}
                user={user}
              ></Thumbnail>
            </li>
          ))}
        </ul>
        <div className={style.btnContainer}>
          <NavButtons></NavButtons>
        </div>
      </section>
    </>
  );
}
