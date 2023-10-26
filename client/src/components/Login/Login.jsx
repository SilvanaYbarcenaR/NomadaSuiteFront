import React, { useState } from "react";
import { Input, Button, Checkbox, Form, Modal } from 'antd';
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import style from "./Login.module.css";

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
};

const googleBtnStyle = {
  border: "1px solid black",
  height: "3rem",
};

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={style.loginBox}>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        className={style.formBox}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onSubmit={handleSubmit}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h3>Bienvenido a NómadaSuite</h3>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <div className={style.emailField}>
              <Input
                // value={userData.email}
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
                message: 'Please input your password!',
              },
            ]}
          >
            <div className={style.passwordField}>
              <Input.Password
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <p>or</p>
          <hr />

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
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
                style={buttonStyle}
                type="submit"
                block
              >
                Ingresar
              </Button>
            </div>
          </Form.Item>
          <div className={style.textRegister}>
            <p>¿No tienes una cuenta? <Link>Regístrate</Link></p>
          </div>
        </Form>
      </Modal>
    </div>
  )
};

export default Login