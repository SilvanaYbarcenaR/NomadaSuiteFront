import { useState } from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';
import style from "./User.module.css";
import Welcome from '../Modals/Welcome/Welcome';

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
};

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
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

const dateFormatList = ['DD/MM/YYYY'];


const User = () => {
  const [form, setForm] = useState({
    names: '',
    surnames: '',
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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
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
        <Form
          onSubmit={handleSubmit}
          name="time_related_controls"
          {...formItemLayout}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
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
          <h3>Registro</h3>
          <Form.Item
            name="names"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su nombre',
              },
            ]}
          >
            <div className={style.namesField}>
              <Input
                name="names"
                value={form.names}
                type="text"
                onChange={handleChange}
                autoComplete="true"
                placeholder="Nombres"
              />
            </div>
          </Form.Item>

          <Form.Item
            name="surnames"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese sus apellidos',
              },
            ]}
          >
            <div className={style.surnamesField}>
              <Input
                name="surnames"
                value={form.surnames}
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
                type="date"
                name='birthdate'
                value={form.birthdate}
                onChange={handleChange}
                placeholder='Fecha de nacimiento'
              />
              <p>Para registrarte, debes tener al menos 18 años. Tu fecha de nacimiento no se compartirá con otras personas que utilicen nuestra app.</p>
            </div>
          </Form.Item>
        </Form>
        {/* 
          <div className={style.emailField}>
            <Input
              type="email"
              name="email"
              autoComplete="true"
              placeholder="Email"
            />
            <p>Le enviaremos por correo electrónico la confirmación.</p>
          </div>

          <div className={style.passwordField}>
            <Input.Password
              placeholder="Password"
              name="password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </div>

          <div className={style.submitBtn}>
            <Button
              style={buttonStyle}
              type="submit"
              onClick={() => setIsWelcomeModalOpen(true)}
              block
            >
              Ingresar
            </Button>
          </div>
        </form >
      </Modal>
      <Modal
        open={isWelcomeModalOpen}
        onCancel={() => setIsWelcomeModalOpen(false)} // Close the Welcome modal
        footer={null} // Hide the default modal footer
      >
        <Welcome /> */}
      </Modal>
    </div >
  )
};

export default User;