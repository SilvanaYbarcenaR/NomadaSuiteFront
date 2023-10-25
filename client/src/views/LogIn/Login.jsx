import { useState } from "react";
import { BsEyeSlash } from "react-icons/bs"
import style from "./Login.module.css"

const Login = () => {
  const [view, setView] = useState(false);
  const showPassword = () => {
    setView(!view);
  };
  return (
    <div className={style.background}>
      <form className={style.formBox}>
        <div className={style.emailField}>
          <h3>Bienvenido a NómadaSuite</h3>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="true"
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className={style.passwordField}>
          <input
            type={view ? "text" : "password"}
            name="password"
            id="password"
          />
          <BsEyeSlash onClick={showPassword} />
          <label htmlFor="password">Password</label>
          <hr />
          <button>Ingresar</button>
        </div>
        <div>
          <p>¿No tienes una cuenta? Regístrate</p>
        </div>
      </form>
    </div>
  )
};

export default Login