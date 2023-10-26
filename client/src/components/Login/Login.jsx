import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { FcGoogle } from "react-icons/fc";
import style from "./Login.module.css";
import { Link } from "react-router-dom";

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
};

const googleBtnStyle = {
  border: "1px solid black",
  height: "3rem",
};

const Login = () => {
  return (
    <div className={style.loginBox}>
      <form className={style.formBox}>
        <div className={style.emailField}>
          <h3>Bienvenido a NómadaSuite</h3>
          <Input
            type="email"
            name="email"
            autoComplete="true"
            placeholder="Email"
          />
        </div>

        <div className={style.passwordField}>
          <Input.Password
            placeholder="Password"
            name="password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </div>
        <p>or</p>
        <hr />

        <div className={style.googleBtn}>
          <Button
            style={googleBtnStyle}
            type="submit"
            block
          >
            Continuar con Google
            <FcGoogle className={style.icon} />
          </Button>
        </div>

        <div className={style.submitBtn}>
          <Button
            style={buttonStyle}
            type="submit"
            block
          >
            Ingresar
          </Button>
        </div>

        <div className={style.textRegister}>
          <p>¿No tienes una cuenta? <Link>Regístrate</Link></p>
        </div>

      </form>
    </div>
  )
};

export default Login