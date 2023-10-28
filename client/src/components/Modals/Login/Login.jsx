import React, { useState } from "react";
import { Input, Button, Checkbox, Form, Modal } from 'antd';
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import style from "./Login.module.css";
import User from "../RegisterUser/User";
import Welcome from "../Welcome/Welcome";

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
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setUserData({
      ...userData,
      [property]: value
    });
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const handleWelcomeClick = () => {
    setShowWelcomeModal(true);
  };

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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
          <div className={style.emailField}>
            <Input
              name="email"
              value={userData.email}
              type="email"
              onChange={handleChange}
              autoComplete="true"
              placeholder="Email"
            />
          </div>
        </Form.Item>

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
              placeholder="Password"
            />
          </div>
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            span: 16,
          }}
        >
          <Checkbox>Recuérdame</Checkbox>
        </Form.Item>

        <span className={style.span}>or</span>
        <hr />

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
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
              block
              htmlType="submit"
              onClick={handleWelcomeClick}
              style={buttonStyle}
              type="primary"
            >
              Ingresar
            </Button>
          </div>
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
