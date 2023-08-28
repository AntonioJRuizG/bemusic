import { Link } from "react-router-dom";
import { MenuOptions } from "../../../app/app";

import style from "./menu.list.style.module.scss";

export type NavProps = {
  menuOptions: MenuOptions[];
};

export function MenuList({ menuOptions }: NavProps) {
  return (
    <>
      {menuOptions.map((item) => (
        <li key={item.id} className={style.mainMenuListLi}>
          <Link to={item.path} className={style.mainMenuListLink}>
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
}
