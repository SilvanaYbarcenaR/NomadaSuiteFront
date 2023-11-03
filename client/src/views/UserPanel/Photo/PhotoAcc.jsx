import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Upload } from 'antd';
import { Link } from 'react-router-dom';
import style from '../Photo/PhotoAcc.module.css';
import Welcome from '../../../components/Modals/Welcome/Welcome';



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

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [form] = Form.useForm();
  const handleWelcomeClick = () => {
    setShowWelcomeModal(true);
  };


  return (
    <div>
      <Form
        form={form}
        className={style.formBox}
        name="photo"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 24,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <hr />
          <h1 style={{ marginTop: '30px', fontWeight: 'bold' }}>Añade o Modifica</h1>
          <h1 style={{ fontWeight: 'bold' }}>Tu foto</h1>
            <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload
                accept='image/png, image/jpeg'
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                className={style.upload}
                fileList={fileList}
                listType="picture-circle"
                name='image'
                onPreview={handlePreview}
                onChange={handleChange}
                type='file'
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
            <span style={{ marginLeft: '30px', fontWeight: 'bold', color: '#231CA7', fontSize: '12px' }}>
              RECUERDA, los anfitriones no podrán ver tu foto de perfil hasta que se confirme tu reserva.
            </span>
        </div>
        
        
      </Form>
      
    </div>
  )
};

export default Photo;