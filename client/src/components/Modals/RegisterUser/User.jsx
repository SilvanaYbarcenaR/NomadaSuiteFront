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
  const [form, setForm] = useState({
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
      setForm({
        ...form,
        [property]: value,
        userName: updatedFirstName,
      });
    } else {
      setForm({
        ...form,
        [property]: value
      });
    }
  };

  const handleDateChange = (date, dateString) => {
    setForm({
      ...form,
      birthdate: dateString
    });
  };

  const carouselRef = useRef();
  const [serverResponse, setServerResponse] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = async () => {
    try {
      const currentDate = new Date();
      const birthdate = new Date(form.birthdate);
      const age = currentDate.getFullYear() - birthdate.getFullYear();
      if (form.firstName && form.lastName && form.email && form.password && form.password === form.confirm && age >= 18) {
        const response = await axios.post('http://localhost:3001/api/user/register', {
          userName: form.userName,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          birthdate: form.birthdate,
        })
      }
      if (setServerResponse({ success: 'Usuario registrado con éxito' })) {
        setCurrentSlide(1);
      }
    } catch (error) {
      console.error(error);
      setServerResponse({ error: 'No se pudo registrar el usuario' });
    }
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
    <Carousel effect="fade" dots={true} ref={carouselRef}>
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
                value={form.firstName}
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
                value={form.lastName}
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
                value={form.email}
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
                value={form.password}
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
                value={form.confirm}
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
                onClick={handleNextSlide}
                style={buttonStyle}
                type="primary"
              >
                Registrarse
              </Button>
            </div>

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
      </div >
      <div>
        <Photo />
      </div>
    </Carousel>
  )
};

export default User;