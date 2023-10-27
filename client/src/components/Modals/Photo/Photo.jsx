import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Upload } from 'antd';
import { Link } from 'react-router-dom';
import style from './Photo.module.css';

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Photo = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([])
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleModalCancel = () => {
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
        className={style.formBox}
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form>
          <h3>Registro</h3>
          <hr />
          <h1>Añade una foto</h1>
          <p>Elige una imagen que muestre tu rostro. Los anfitriones no podrán ver tu foto de perfil hasta que se confirme tu reserva.</p>
          <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload
              className={style.upload}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={buttonStyle}
              block
            >
              Finalizar
            </Button>
          </Form.Item>
          <Link>
            <p>Lo haré más tarde</p>
          </Link>
        </Form>
      </Modal>
    </div>
  )
};

export default Photo;