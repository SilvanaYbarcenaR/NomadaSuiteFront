import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import style from "./Welcome.module.css"

const Welcome = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    showModal();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <Modal
        className={style.modalBox}
        title="Registro exitoso"
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