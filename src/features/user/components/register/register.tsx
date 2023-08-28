import { SyntheticEvent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hook/use.user.hook";
import { UserProps } from "../../model/user.model";
import { UserRepo } from "../../services/repository/user.repo";

import style from "./register.style.module.scss";

export function RegisterForm() {
  const navigate = useNavigate();

  const repo = useMemo(() => new UserRepo(), []);
  const { regUser } = useUsers(repo);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input");

    const registerUser: Partial<UserProps> = {
      name: inputs[0].value,
      email: inputs[1].value,
      password: inputs[2].value,
    };

    regUser(registerUser);
    form.reset();
    navigate("/iniciar_sesion");
  };

  return (
    <div className={style.registerPage}>
      <section className={style.registerSection}>
        <div className={style.registerHeader}>
          <h2>Registro de usuario</h2>
        </div>
        <div className={style.registerForm}>
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" name="firstName" placeholder="Nombre" />
            </label>
            <label>
              <input type="text" name="email" placeholder="Correo" required />
            </label>
            <label>
              <input
                type="password"
                name="password"
                placeholder="Clave de acceso"
                autoComplete="off"
                required
              />
            </label>
            <button type="submit">Registro</button>
          </form>
        </div>
      </section>
    </div>
  );
}
