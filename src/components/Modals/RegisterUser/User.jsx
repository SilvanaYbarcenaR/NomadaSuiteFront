import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, notification } from 'antd';
import { FcGoogle } from "react-icons/fc";
import Photo from '../Photo/Photo';
import axios from 'axios';
import style from "./User.module.css";
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { loginGoogle } from '../../../redux/Actions/actions';

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

const User = ({ closeUserModal }) => {

  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [showPhotoUser, setShowPhotoUser] = useState(false);
  const [formUser, setFormUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthdate: '',
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setFormUser({
      ...formUser,
      [property]: value
    });
  };

  const handleDateChange = (date, dateString) => {
    setFormUser({
      ...formUser,
      birthdate: dateString
    });
  };

  const handleSubmit = async () => {
    const currentDate = new Date();
    const birthdate = new Date(formUser.birthdate);
    const age = currentDate.getFullYear() - birthdate.getFullYear();
    if (formUser.firstName && formUser.lastName && formUser.email && formUser.password && formUser.password === formUser.confirm && age >= 18) {
      try {
        const response = await axios.post('/user/register', {
          firstName: formUser.firstName,
          lastName: formUser.lastName,
          email: formUser.email,
          password: formUser.password,
          birthdate: formUser.birthdate,
        });
        const data = response.data.userId
        setUserId(data)
        setShowPhotoUser(true);
        notification.success({
          message: '¡Excelente!',
          description: 'El registro de usuario se realizó con éxito.',
          placement: 'bottomLeft'
        });
      } catch (error) {
        notification.error({
          message: 'Error',
          description: `Lo sentimos, ${(error.response.data.error).toLowerCase()}.`,
          placement: 'bottomLeft'
        });
      };
    };
  };

  const loginGoogleAccount = useGoogleLogin({
    onSuccess: (googleUser) => {
      dispatch(loginGoogle(googleUser))
        .then(() => {
          closeUserModal()
        })
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    <div>
      <Form
        name="user"
        onFinish={handleSubmit}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: "100%",
        }}
      >

        {/* FirstName */}

        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su nombre',
            },
          ]}
        >
          <div className={style.nameField}>
            <Input
              name="firstName"
              value={formUser.firstName}
              type="text"
              onChange={handleChange}
              autoComplete="true"
              placeholder="Nombres"
            />
          </div>
        </Form.Item>

        {/* FirstName end*/}
        {/* LastName */}

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
              value={formUser.lastName}
              type="text"
              onChange={handleChange}
              autoComplete="true"
              placeholder="Apellidos"
            />
          </div>
        </Form.Item>

        {/* LastName end*/}

        <div className={style.ageField}>
          <p>Para registrarte, debes tener al menos 18 años. Tu fecha de nacimiento no se compartirá con otras personas que utilicen nuestra app.</p>
        </div>

        {/* Birthdate */}

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

        {/* Birthdate end*/}

        <div className={style.ageField}>
          <p>Este email será utilizado para el envío de notificaciones.</p>
        </div>

        {/* Email */}

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
              value={formUser.email}
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
              pattern: /^(?=.*[.!@#$%^&*]).*$/,
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
              value={formUser.password}
            />
          </div>
        </Form.Item>

        {/* Password end*/}
        {/* Confirm password */}

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
              value={formUser.confirm}
              placeholder='Confirmar contraseña'
            />
          </div>
        </Form.Item>

        {/* Confirm password end*/}
        {/* Button submit */}

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <div className={style.submitBtn}>
            <Button
              block
              htmlType="submit"
              style={buttonStyle}
              type="primary"
            >
              Registrarse
            </Button>
          </div>

          {/* Button submit end */}

          <Photo showPhoto={showPhotoUser} userId={userId} />

          {/* Google */}

          <div className={style.googleBtn}>
            <Button
              onClick={loginGoogleAccount}
              style={googleBtnStyle}
              type="submit"
              block
            >
              Regístrate con Google
              <FcGoogle className={style.icon} />
            </Button>
          </div>
        </Form.Item>

        {/* Google end*/}

      </Form>
    </div>
  )
};

export default User;