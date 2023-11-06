import React, { useRef, useState } from 'react';
import { Button, Carousel, DatePicker, Form, Input } from 'antd';
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

const User = () => {

  const dispatch = useDispatch();
  const [showPhotoUser, setShowPhotoUser] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
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
    if (property === 'firstName') {
      const names = value.split(' ');
      const updatedFirstName = names[0];
      setFormUser({
        ...formUser,
        [property]: value,
        userName: updatedFirstName,
      });
    } else {
      setFormUser({
        ...formUser,
        [property]: value
      });
    }
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
        await axios.post('http://localhost:3001/api/user/register', {
          userName: formUser.userName,
          firstName: formUser.firstName,
          lastName: formUser.lastName,
          email: formUser.email,
          password: formUser.password,
          birthdate: formUser.birthdate,
        });
        setServerResponse({ success: 'Usuario registrado con éxito' });
        setShowPhotoUser(true);
      } catch (error) {
        setServerResponse({ error: `No se pudo registrar el usuario. ${error.response.data.error}` });
      };
    };
  };

  const renderServerResponse = () => {
    if (serverResponse) {
      return (
        <div className={serverResponse.error ? 'error' : 'success'}>
          {serverResponse.error || serverResponse.success}
        </div>
      );
    }
  };

  const loginGoogleAccount = useGoogleLogin({
    onSuccess: (googleUser) => {
      dispatch(loginGoogle(googleUser));
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
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
              onClick={handleSubmit}
              style={buttonStyle}
              type="primary"
            >
              Registrarse
            </Button>
          </div>

          {/* Button submit end */}

          <Photo showPhoto={showPhotoUser} />

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

        {renderServerResponse()}
      </Form>
    </div>
  )
};

export default User;