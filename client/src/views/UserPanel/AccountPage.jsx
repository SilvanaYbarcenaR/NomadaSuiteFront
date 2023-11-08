import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import style from "../UserPanel/AccountPage.module.css"
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Form, Input, Card, Flex, DatePicker, Tabs } from 'antd';
import Photo from "../UserPanel/Photo/PhotoAcc"
import SimpleReservation from "../UserPanel/Reservations"



const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

const cardStyle = {
  width: 720,
};


const AccountPage = () => {

  const [activeTab, setActiveTab] = useState('1'); // Inicializa la pestaña activa en '1'

  // const userLoggedInfo = useSelector((state) => state.userLogged);

  const [formDisabled, setFormDisabled] = useState(true);
  const toggleForm = () => {
    setFormDisabled(!formDisabled);
  };

  
  const userLoggedInfoFromRedux = useSelector((state) => state.userLogged);

  const [userLoggedInfo, setUserLoggedInfo] = useState({
    firstName: userLoggedInfoFromRedux.firstName,
  });
  

  const handleFirstNameChange = (e) => {
    // Actualiza el valor de userLoggedInfo.firstName cuando el usuario cambia el valor en el campo de entrada
    const newValue = e.target.value;
    setUserLoggedInfo({
      ...userLoggedInfo,
      firstName: newValue,
    });
  };

    return (
        <>
            <div style={{ marginTop: '50px' }}>
                <Tabs
                    defaultActiveKey="1"
                    activeKey={activeTab} // Establece la pestaña activa basada en la variable de estado
                    onChange={(key) => setActiveTab(key)} // Actualiza la variable de estado cuando se cambia de pestaña
                    type="card"
                    centered
                    size="large"
                    tabBarGutter={86}
                    items={[
                        {
                          label: <div className={`${activeTab === '1' ? style.activeLabel : style.inactiveLabel}`}><b>Mi Perfil</b></div>,
                          key: '1',
                          
                          children: 
                                <Flex style={{ alignItems: 'center', justifyContent: 'center',display: 'flex' }}>
                                    <Card
                                      style={cardStyle}
                                      bodyStyle={{
                                        padding: 0,
                                        overflow: 'hidden',
                                      }}
                                    >
                                      <Flex justify="space-between">
                                      <Photo />
                                        <Flex
                                          vertical
                                          align="flex-end"
                                          justify="space-between"
                                          style={{
                                            padding: 52,
                                          }}
                                        >
                                          <>
                                            <Form layout="horizontal">
                                              <Form.Item label="">
                                              <Input
                                                className={style.userinfo}
                                                value={userLoggedInfoFromRedux.firstName} // Utiliza el valor del estado
                                                onChange={handleFirstNameChange} // Maneja el cambio del valor
                                                disabled={formDisabled}
                                                placeholder=""
                                              />
                                              </Form.Item>
                                            </Form>
                                          </>
                                          <>
                                            <Form layout="horizontal">
                                              <Form.Item label="">
                                                <Input className={style.userinfo} defaultValue="Apellidos" value={userLoggedInfo.lastName} disabled={formDisabled} placeholder="" />
                                              </Form.Item>
                                            </Form>
                                          </>
                                          <>
                                            <Form layout="horizontal">
                                              <Form.Item label="">
                                              <DatePicker
                                              className={style.userinfo} disabled={formDisabled} value={userLoggedInfo.birthdate} placeholder=''
                                              />
                                              </Form.Item>
                                            </Form>
                                          </>
                                          <>
                                            <Form layout="horizontal">
                                              <Form.Item label="">
                                                <Input className={style.userinfo} defaultValue="Email" value={userLoggedInfo.email} disabled={true} placeholder="" />
                                              </Form.Item>
                                            </Form>
                                          </>
                                            <Button onClick={toggleForm}>
                                              {formDisabled ? 'Editar Datos' : 'Aceptar Cambios'}
                                            </Button>
                                        </Flex>
                                      </Flex>
                                    </Card>
                                </Flex>
                        },
                        {
                          label: <div className={`${activeTab === '2' ? style.activeLabel : style.inactiveLabel}`}><b>Mis Reservaciones</b></div>,
                          key: '2',
                          children:
                                <div style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <SimpleReservation />
                                </div>
                        },
                        {
                          label: <div className={`${activeTab === '3' ? style.activeLabel : style.inactiveLabel}`}><b>Mis Accommodations</b></div>,
                          key: '3',
                          children:
                              
                                <Flex style={{ alignItems: 'center', justifyContent: 'center',display: 'flex' }}>
                                    <Upload {...props}>
                                        <Button style={{ alignItems: 'center', justifyContent: 'center',display: 'flex' }} icon={<UploadOutlined />}>Click to Upload</Button>
                                        <Button style={{ alignItems: 'center', justifyContent: 'center',display: 'flex' }} icon={<UploadOutlined />}>Click to Upload</Button>
                                        <Button style={{ alignItems: 'center', justifyContent: 'center',display: 'flex' }} icon={<UploadOutlined />}>Click to Upload</Button>
                                        <Button style={{ alignItems: 'center', justifyContent: 'center',display: 'flex' }} icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Flex>
                        },
                    ]}
                />
            </div>        
        </>
    )
};

export default AccountPage;