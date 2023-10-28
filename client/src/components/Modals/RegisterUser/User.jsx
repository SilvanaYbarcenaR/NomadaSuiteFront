import React, { useRef, useState } from 'react';
import { Button, Carousel, DatePicker, Form, Input } from 'antd';
import style from "./User.module.css";
import Photo from '../Photo/Photo';

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
};

const User = () => {
  const [form, setForm] = useState({
    userName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    birthdate: '',
    wantsNotification: true
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

  const carouselRef = useRef();



  const handleNextSlide = () => {
    const currentDate = new Date();
    const birthdate = new Date(form.birthdate);
    const age = currentDate.getFullYear() - birthdate.getFullYear();

    if (
      form.userName &&
      form.lastName &&
      form.email &&
      form.password &&
      form.password === form.confirm &&
      age >= 18
    ) {
      carouselRef.current.next();
    };
  }


  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Carousel effect="fade" dots={false} ref={carouselRef}>
      <div>
        <Form
          name="user"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: "100%",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su nombre',
              },
            ]}
          >
            <div className={style.nameField}>
              <Input
                name="userName"
                value={form.userName}
                type="text"
                onChange={handleChange}
                autoComplete="true"
                placeholder="Nombres"
              />
            </div>
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese sus apellidos',
              },
            ]}
          >
            <div className={style.lastnameField}>
              <Input
                name="lastName"
                value={form.lastName}
                type="text"
                onChange={handleChange}
                autoComplete="true"
                placeholder="Apellidos"
              />
            </div>
          </Form.Item>

          <div className={style.ageField}>
            <p>Para registrarte, debes tener al menos 18 años. Tu fecha de nacimiento no se compartirá con otras personas que utilicen nuestra app.</p>
          </div>
          <Form.Item name="date-picker"
            rules={[{
              required: true,
              message: "La fecha de nacimiento es obligatoria."
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const currentDate = new Date();
                const age = currentDate.getFullYear() - new Date(value).getFullYear();
                if (age < 18) {
                  return Promise.reject(new Error('Debes ser mayor de 18 años para registrarte.'));
                }
                return Promise.resolve();
              },
            }),
            ]}
          >
            <DatePicker
              className={style.datePicker}
              onChange={(date, dateString) => handleDateChange(date, dateString)}
              placeholder='Fecha de nacimiento'
            />
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
              {
                min: 6,
                max: 15,
                message: 'La contraseña debe tener entre 6 y 15 caracteres',
              },
              {
                pattern: /^(?=.*[0-9]).*$/,
                message: 'La contraseña debe contener al menos un número',
              },
              {
                pattern: /^(?=.*[A-Z]).*$/,
                message: 'La contraseña debe contener al menos una letra mayúscula',
              },
              {
                pattern: /^(?=.*[!@#$%^&*]).*$/,
                message: 'La contraseña debe contener al menos un carácter especial (por ejemplo: !@#$%^&*)',
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
                name="confirm"
                onChange={handleChange}
                value={form.confirm}
                placeholder='Confirmar contraseña'
              />
            </div>
          </Form.Item>

          <div className={style.submitBtn}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleNextSlide}
              style={buttonStyle}
              block
            >
              Ingresar
            </Button>
          </div>
        </Form>
      </div >
      <div>
        <Photo />
      </div>
    </Carousel>
  )
};

export default User;