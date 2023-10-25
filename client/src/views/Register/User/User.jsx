import { useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import style from "./User.module.css";

const User = () => {
    const [view, setView] = useState(false);
    const showPassword = () => {
        setView(!view);
    };
    return (
        <div className={style.userBox}>
            <form className={style.formBox}>
                <div>
                    <div>Registro</div>
                    <input
                        type="text"
                        name="names"
                        id="names"
                    />
                    <label>Nombres</label>
                    <input
                        type="text"
                        name="surnames"
                        id="surnames"
                    />
                    <label>Apellidos</label>
                    <input
                        type="date"
                        name="age"
                        id="age"
                    />
                    <label htmlFor="age">Apellidos</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="true"
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type={view ? "text" : "password"}
                        name="password"
                        id="password"
                    />
                    <BsEyeSlash onClick={showPassword} />
                    <label htmlFor="password">Password</label>
                    <hr />
                    <button>Continuar</button>
                </div>
            </form>
        </div>
    )
};

export default User;