import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";

import style from "./detail.style.module.scss";

export default function Detail() {
  let { instrumentId } = useParams();

  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { euphoniums } = useEuphonium(repo);
  const storeEuphonium = euphoniums.find((item) => item.id === instrumentId);

  return (
    <div className={style.detailPage}>
      <section className={style.detail}>
        <h2>Detalles del bombardino {" " + storeEuphonium?.alias}</h2>
        <div className={style.detailCard}>
          <div className={style.imgContainer}>
            <img
              height={300}
              width={200}
              className={style.detailImg}
              src={storeEuphonium?.image}
              alt={"Imagen del bombardino de " + storeEuphonium?.alias}
            />
          </div>

          <div className={style.detailsList}>
            <ul>
              <li className={style.detailItem}>
                Fabricante: {storeEuphonium?.manufacturer}
              </li>
              <li className={style.detailItem}>
                Modelo: {storeEuphonium?.instrumentModel}
              </li>
              <li className={style.detailItem}>
                Nivel: {storeEuphonium?.material}
              </li>
              <li className={style.detailItem}>
                Número de pistones: {storeEuphonium?.valves}
              </li>
              <li className={style.detailItem}>
                Owner: {storeEuphonium?.creator.name}
              </li>
            </ul>
          </div>
        </div>
        <div className={style.back}>
          <Link to="/">⬅ Volver</Link>
        </div>
      </section>
    </div>
  );
}
