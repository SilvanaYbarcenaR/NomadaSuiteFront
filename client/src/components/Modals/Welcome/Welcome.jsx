import { useState } from 'react';
import { Button, Modal } from 'antd';
import style from "./Welcome.module.css"

const Welcome = () => {
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
        className={style.modalBox}
        title="Crea tu perfil"
        open={isModalOpen}
        onCancel={handleCancel}
        cancelButtonProps={{ className: style.cancelBtn }}
        cancelText="Continuar"
        okButtonProps={{ className: style.okBtn }}
      >
        <hr />
        <img className={style.icon} src='../../src/assets/image/favicon.png' />
        <p className={style.welcomeText}>Bienvenido a NómadaSuite</p>
        <p>Descubre lugares donde quedarte y trabajar desde cualquier parte del mundo.</p>
      </Modal>
    </div>
  )
};

export default Welcome;