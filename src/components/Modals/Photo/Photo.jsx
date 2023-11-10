import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Link } from 'react-router-dom';
import style from './Photo.module.css';

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
};

const Photo = ({ showPhoto, userId }) => {

  console.log(userId);
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const props = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("images", values.image.originFileObj);
      const response = await axios.put(`/user/update/${userId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      notification.success({
        message: '¡Excelente!',
        description: 'El registro de usuario se realizó con éxito.',
        placement: 'bottomLeft'
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Error',
        description: `Lo sentimos, ${(error.response.data.error).toLowerCase()}.`,
        placement: 'bottomLeft'
      });
    }
  }


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
        >
          <ImgCrop rotationSlider>
            <Upload
              {...props}
              name="image"
              accept="image/*"
              className={style.upload}
              listType="picture-circle"
              onChange={onChange}
              onPreview={onPreview}
              type="file"
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </Form.Item>

        {/* Photo end */}

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
    </div>
  )
};

export default Photo;