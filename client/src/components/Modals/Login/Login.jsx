import React, { useState } from "react";
import { Input, Button, Checkbox, Form, Modal } from 'antd';
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import style from "./Login.module.css";
import User from "../RegisterUser/User";
import Welcome from "../Welcome/Welcome";
import axios from "axios";
import { useEffect } from "react";

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
};

const googleBtnStyle = {
  border: "1px solid black",
  height: "3rem",
  paddingTop: "0.8rem"
};

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/user/login', {
        email: userData.email,
        password: userData.password
      });
      const { accessToken, refreshToken } = response.data;
      if (accessToken && refreshToken) {
        handleWelcomeClick()
      }
    } catch (error) {
      setErrors("Credenciales inválidas. Por favor, verifica tu correo y contraseña.");
    }
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUserData({
      ...userData,
      [property]: value
    });
  };

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const handleWelcomeClick = () => {
    setShowWelcomeModal(true);
  };

  const handleRememberChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", userData.email);
      localStorage.setItem("password", userData.password);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe === "true") {
      const email = localStorage.getItem("email") || "";
      const password = localStorage.getItem("password") || "";
      setUserData({ email, password });
    }
  }, []);

  return (
    <div className={style.loginBox}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: "100%",
        }}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su email',
            },
          ]}
        >

          {/* Email */}

          <div className={style.emailField}>
            <Input
              name="email"
              value={userData.email}
              type="email"
              onChange={handleChange}
              autoComplete="true"
              placeholder="Correo"
            />
          </div>
        </Form.Item>

        {/* Email end*/}
        {/* Password */}

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su contraseña',
            },
          ]}
        >
          <div className={style.passwordField}>
            <Input.Password
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </div>
        </Form.Item>
        {errors && <p className={style.errorText}>{errors}</p>}

        {/* Password end*/}
        {/* Remember */}

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            span: 16,
          }}
        >
          <Checkbox onChange={handleRememberChange}>Recuérdame</Checkbox>
        </Form.Item>

        {/* Remember end*/}

        <span className={style.span}>or</span>
        <hr />

        {/* Login Google */}

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <div className={style.googleBtn}>
            <Button
              href="/auth/google"
              style={googleBtnStyle}
              type="submit"
              block
            >
              Continuar con Google
              <FcGoogle className={style.icon} />
            </Button>
          </div>

          {/* Login Google end*/}
          {/* button submit */}

          <div className={style.submitBtn}>
            <Button
              block
              htmlType="submit"
              onClick={handleSubmit}
              style={buttonStyle}
              type="primary"
            >
              Ingresar
            </Button>
          </div>

          {/* button submit */}

        </Form.Item>
        <div className={style.textRegister}>
          <p>¿No tienes una cuenta? <Link onClick={() => setShowRegisterModal(true)}>Regístrate</Link></p>
        </div>
      </Form>
      <Modal
        title="Registro"
        open={showRegisterModal}
        onOk={() => setShowRegisterModal(false)}
        onCancel={() => setShowRegisterModal(false)}
        footer={null}
      >
        <User />
      </Modal>
      <Modal
        className={style.welcome}
        title="Inicio de sesión exitoso."
        open={showWelcomeModal}
        onOk={() => setShowWelcomeModal(false)}
        onCancel={() => setShowWelcomeModal(false)}
        footer={null}
      >
        <Welcome />
      </Modal>
    </div>
  )
};

export default Login;
