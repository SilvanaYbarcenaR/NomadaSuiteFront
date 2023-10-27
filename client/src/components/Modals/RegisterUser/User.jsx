import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';
import style from "./User.module.css";
// import Welcome from '../Modals/Welcome/Welcome';

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
};

const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const User = () => {
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    birthdate: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value
    });
  };

  const handleDateChange = (date, dateString) => {
    setForm({
      ...form,
      birthdate: dateString

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
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        className={style.formBox}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onSubmit={handleSubmit}>
          <h3>Registro</h3>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su nombre',
              },
            ]}
          >
            <div className={style.nameField}>
              <Input
                name="name"
                value={form.name}
                type="text"
                onChange={handleChange}
                autoComplete="true"
                placeholder="Nombres"
              />
            </div>
          </Form.Item>

          <Form.Item
            name="lastname"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese sus apellidos',
              },
            ]}
          >
            <div className={style.lastnameField}>
              <Input
                name="lastname"
                value={form.lastname}
                type="text"
                onChange={handleChange}
                autoComplete="true"
                placeholder="Apellidos"
              />
            </div>
          </Form.Item>

          <Form.Item name="date-picker" {...config}>
            <div className={style.ageField}>
              <DatePicker
                className={style.datePicker}
                onChange={(date, dateString) => handleDateChange(date, dateString)}
                placeholder='Fecha de nacimiento'
              />
              <p>Para registrarte, debes tener al menos 18 años. Tu fecha de nacimiento no se compartirá con otras personas que utilicen nuestra app.</p>
            </div>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'La información no es válida',
              },
              {
                required: true,
                message: 'Por favor ingrese su email',
              },
            ]}
          >
            <div className={style.emailField}>
              <Input
                autoComplete="true"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                value={form.email}
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
            hasFeedback
          >
            <div className={style.passwordField}>
              <Input.Password
                name="password"
                onChange={handleChange}
                placeholder="Contraseña"
                value={form.password}
              />
            </div>
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Confirmar contraseña',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('La contraseña no coincide'));
                },
              }),
            ]}
          >
            <div className={style.passwordField}>
              <Input.Password
                name="password"
                placeholder='Confirmar contraseña'
              />
            </div>
          </Form.Item>

          <div className={style.submitBtn}>
            <Button
              type="primary"
              htmlType="submit"
              style={buttonStyle}
              block
            >
              Ingresar
            </Button>
          </div>
        </Form>
      </Modal>
    </div >
  )
};

export default User;