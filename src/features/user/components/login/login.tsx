import { SyntheticEvent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hook/use.user.hook";
import { UserProps } from "../../model/user.model";
import { UserRepo } from "../../services/repository/user.repo";

import style from "./login.style.module.scss";

import Swal from "sweetalert2";

export function LoginForm() {
  const navigate = useNavigate();

  const repo = useMemo(() => new UserRepo(), []);
  const { logUser } = useUsers(repo);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input");

    const currentUser: Partial<UserProps> = {
      email: inputs[0].value,
      password: inputs[1].value,
    };
    logUser(currentUser);
    form.reset();
    navigate("/");
  };

  return (
    <div className={style.loginPage}>
      <section className={style.loginSection}>
        <div className={style.loginHeader}>
          <h2>Inicio de sesión</h2>
        </div>
        <div className={style.loginForm}>
          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              onClick={() => Swal.fire({ text: "Que viva la música!" })}
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
