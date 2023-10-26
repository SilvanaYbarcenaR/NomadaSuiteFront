import { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, DatePicker, Input, Modal } from 'antd';
import style from "./User.module.css";
import Welcome from '../Modals/Welcome/Welcome';

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
};

const dateFormatList = ['DD/MM/YYYY'];

const User = () => {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={style.userBox}>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form>
          <div className={style.nameField}>
            <h3>Registro</h3>
            <Input
              type="text"
              name="name"
              autoComplete="true"
              placeholder="Nombres"
            />
          </div>

          <div className={style.surnamesField}>
            <Input
              type="text"
              name="surnames"
              autoComplete="true"
              placeholder="Apellidos"
            />
          </div>

          <div className={style.ageField}>
            <DatePicker className={style.datePicker} name="age" format={dateFormatList} placeholder="Fecha de nacimiento" />
            <p>Para registrarte, debes tener al menos 18 años. Tu fecha de nacimiento no se compartirá con otras personas que utilicen nuestra app.</p>
          </div>

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
        <Welcome />
      </Modal>
    </div >
  )
};

export default User;