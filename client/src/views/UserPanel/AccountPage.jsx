import React, { useState } from 'react';
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

  const [formDisabled, setFormDisabled] = useState(true);
  const toggleForm = () => {
    setFormDisabled(!formDisabled);
  };

    return (
        <>
            <div style={{ marginTop: '50px' }}>
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    centered
                    size="large"
                    tabBarGutter={86}
                    items={[
                        {
                          label: <b>Mi Perfil</b>,
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
                                                <Input className={style.userinfo} defaultValue="Nombres" disabled={formDisabled} placeholder="" />
                                              </Form.Item>
                                            </Form>
                                          </>
                                          <>
                                            <Form layout="horizontal">
                                              <Form.Item label="">
                                                <Input className={style.userinfo} defaultValue="Apellidos" disabled={formDisabled} placeholder="" />
                                              </Form.Item>
                                            </Form>
                                          </>
                                          <>
                                            <Form layout="horizontal">
                                              <Form.Item label="">
                                              <DatePicker
                                              className={style.userinfo} disabled={formDisabled} placeholder='Fecha de nacimiento'
                                              />
                                              </Form.Item>
                                            </Form>
                                          </>
                                          <>
                                            <Form layout="horizontal">
                                              <Form.Item label="">
                                                <Input className={style.userinfo} defaultValue="Email" value="pepe@suite.com" disabled={true} placeholder="" />
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
                          label: <b>Mis Reservaciones</b>,
                          key: '2',
                          children:
                                <div style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <SimpleReservation />
                                </div>
                        },
                        {
                          label: <b>Mis accomodations</b>,
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