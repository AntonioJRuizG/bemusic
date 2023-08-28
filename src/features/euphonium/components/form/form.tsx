import { SyntheticEvent, useMemo, useState } from "react";
import { EuphoniumProps } from "../../model/euphonium.model";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { useEuphonium } from "../../hook/use.euphonium.hook";

import style from "./form.style.module.scss";
import { Link, useParams } from "react-router-dom";
import { UserRepo } from "../../../user/services/repository/user.repo";
import { useUsers } from "../../../user/hook/use.user.hook";

export const AddEditForm = () => {
  let { instrumentEditId } = useParams();
  const UpdateMode = instrumentEditId;
  const repo = useMemo(() => new EuphoniumRepo(), []);
  const { addEuphonium, euphoniums, updateEuphonium } = useEuphonium(repo);
  const repoUser = useMemo(() => new UserRepo(), []);
  const { user } = useUsers(repoUser);

  const storeEuphonium = euphoniums.find(
    (item) => item.id === instrumentEditId
  );

  const [success, setSuccess] = useState<string>("");

  const initialItemData: EuphoniumProps = {
    id: "",
    alias: "",
    manufacturer: "",
    instrumentModel: "",
    material: "",
    valves: 4,
  } as EuphoniumProps;

  const [euphoniumData, setEuphoniumData] = useState(
    storeEuphonium ? storeEuphonium : initialItemData
  );

  const handleChange = (ev: SyntheticEvent) => {
    const element = ev.target as HTMLFormElement;
    setEuphoniumData({
      ...euphoniumData,
      [element.name]: element.value,
    });
  };

  const handleSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    const formData = ev.currentTarget as HTMLFormElement;
    let image = (formData.elements[5] as HTMLFormElement).files?.item(0);

    if (UpdateMode) {
      updateEuphonium(euphoniumData, user.token, image);
      setSuccess(`Editado correctamente!`);
    } else {
      addEuphonium(euphoniumData, user.token, image);
      setSuccess(`Agregado correctamente!`);
    }
  };

  return (
    <div className={style.formPage}>
      <section className={style.form}>
        <h2>{!UpdateMode ? "Añade tu bombardino" : "Edita tu bombardino"}</h2>
        <div className={style.formContainer}>
          {UpdateMode && (
            <img
              width={200}
              height={280}
              className={style.detailImg}
              src={storeEuphonium?.image}
              alt={"Imagen del bombardino de " + storeEuphonium?.alias}
            />
          )}
          <form className={style.formList} action="" onSubmit={handleSubmit}>
            <div className={style.formInputContainer}>
              <div>
                <label htmlFor="alias">Alias</label>
              </div>
              <div>
                <input
                  className={style.formInput}
                  type="text"
                  id="alias"
                  name="alias"
                  onChange={handleChange}
                  placeholder="Alias"
                  defaultValue={storeEuphonium?.alias}
                  required
                />
              </div>
            </div>

            <div className={style.formInputContainer}>
              <div>
                <label htmlFor="manufacturer">Fabricante</label>
              </div>

              <div>
                <input
                  className={style.formInput}
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  onChange={handleChange}
                  placeholder="Fabricante"
                  defaultValue={storeEuphonium?.manufacturer}
                  required
                />
              </div>
            </div>

            <div className={style.formInputContainer}>
              <div>
                <label htmlFor="instrumentModel">Modelo</label>
              </div>
              <div>
                <input
                  className={style.formInput}
                  type="text"
                  id="instrumentModel"
                  name="instrumentModel"
                  onChange={handleChange}
                  placeholder="Modelo"
                  defaultValue={storeEuphonium?.instrumentModel}
                  required
                />
              </div>
            </div>

            <div className={style.formInputContainer}>
              <div>
                <label htmlFor="valves">Nº de pistones</label>
              </div>
              <div>
                <select
                  className={style.formSelector}
                  name="valves"
                  id="valves"
                  onChange={handleChange}
                  defaultValue={storeEuphonium?.valves}
                  required
                >
                  <option></option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>

            <div className={style.formInputContainer}>
              <div>
                <div>
                  <label htmlFor="material">Material: </label>
                </div>
                <div>
                  <select
                    className={style.formSelector}
                    name="material"
                    id="material"
                    onChange={handleChange}
                    defaultValue={storeEuphonium?.material}
                    required
                  >
                    <option></option>
                    <option value="Plateado">Plateado</option>
                    <option value="Dorado">Dorado</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={style.formInputContainer}>
              <div>
                <div>
                  <label htmlFor="image">Imagen: </label>
                </div>
                <div>
                  <input
                    className={style.formImgInput}
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Image"
                  />
                </div>
              </div>
            </div>
            <div>
              <button className={style.formButton} type="submit">
                {UpdateMode ? "Guardar" : "Añadir"}
              </button>
            </div>
          </form>
          <p>{success}</p>
        </div>
        <div className={style.back}>
          <Link to="/">⬅ Volver</Link>
        </div>
      </section>
    </div>
  );
};
