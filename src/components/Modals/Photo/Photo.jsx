import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Upload } from 'antd';
import { Link } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import style from './Photo.module.css';

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Photo = ({ showPhoto }) => {

  const [serverResponse, setServerResponse] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([])


  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [form] = Form.useForm();
  const handleWelcomeClick = () => {
    setShowWelcomeModal(true);
  };

  const handleLaterClick = () => {
    form
      .validateFields()
      .then(() => {
        onFinish(form.getFieldsValue());
        setShowWelcomeModal(true);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

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

  const handleFormSubmit = async (values) => {
    var form = document.querySelector('form');
    let formDataToSend = new FormData(form);
    if (values.image.length > 0) {
      values.image.forEach((image) => {
        formDataToSend.append("images", image.originFileObj);
      })
    }

    try {
      // const URL = 'https://nomada-suite.onrender.com/api'
      const URL = 'http://localhost:3001/api'
      const response = await axios.post(`${URL}/accommodation/create`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setServerResponse({ success: 'Foto registrada con éxito' });
    } catch (error) {
      setServerResponse({ error: `No se pudo registrar el usuario. ${error.response.data.error}` });
    }
  }
  const renderServerResponse = () => {
    if (serverResponse) {
      return (
        <div className={serverResponse.error ? 'error' : 'success'}>
          {serverResponse.error || serverResponse.success}
        </div>
      );
    }
  };

  return (
    <div className={`${style.photoContainer} ${showPhoto ? style.show : ""}`}>
      <Form
        name="photo"
        onFinish={handleFormSubmit}
        className={style.formBox}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <hr />
        <h1>Añade una foto</h1>
        <p>Elige una imagen que muestre tu rostro.</p>

        {/* Photo */}

        <Form.Item
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            accept="image/*"
            className={style.upload}
            fileList={fileList}
            listType="picture-circle"
            onPreview={handlePreview}
            onChange={handleChange}
            type="file"
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <hr />
        <Modal
          footer={null}
          onCancel={handleCancel}
          open={previewOpen}
        >
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal>

        {/* Photo end */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={buttonStyle}
            onClick={handleWelcomeClick}
            block
          >
            Finalizar
          </Button>
        </Form.Item>

        {renderServerResponse()}

        <Link>
          <p onClick={handleLaterClick}>Lo haré más tarde</p>
        </Link>
      </Form>
      <Modal
        className={style.welcome}
        title="Registro exitoso."
        open={showWelcomeModal}
        onOk={() => setShowWelcomeModal(false)}
        onCancel={() => setShowWelcomeModal(false)}
        footer={null}
      >
        <Welcome />
      </Modal>
    </div>
  )
};

export default Photo;