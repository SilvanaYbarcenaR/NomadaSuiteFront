import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from "../../redux/Actions/actions";
import { updateUserInfo } from "../../redux/Actions/actions";
import style from "../UserPanel/AccountPage.module.css";
import { Button, Form, Input, Card, Flex, DatePicker, Tabs } from 'antd';
import Photo from "../UserPanel/Photo/PhotoAcc";
import SimpleReservation from "../UserPanel/Reservations";
import Acommodation from "../Register/Accommodation/Accommodation";

const cardStyle = {
  width: 720,
};

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('Perfil');
  const [formDisabled, setFormDisabled] = useState(true);
  const dispatch = useDispatch();
  const userLoggedInfoFromRedux = useSelector((state) => state.userLogged);

  console.log(userLoggedInfoFromRedux._id);

  const [userLoggedInfo, setUserLoggedInfo] = useState({
    firstName: userLoggedInfoFromRedux.firstName,
    lastName: userLoggedInfoFromRedux.lastName,
  });

  const userId=userLoggedInfoFromRedux._id;

console.log(userId);

  const handleUpdateUserInfo = async () => {
    // Realiza una solicitud PUT para actualizar el nombre y apellido del usuario
    await axios.put(`/user/update/${userId}`, {

      
      firstName: userLoggedInfo.firstName,
      lastName: userLoggedInfo.lastName,
      })
  
  };

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <>
      <div style={{ marginTop: '50px' }}>
        <Tabs
          defaultActiveKey="Perfil"
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          type="card"
          centered
          size="large"
          tabBarGutter={86}
          items={[
            {
              label: <div className={`${activeTab === 'Perfil' ? style.activeLabel : style.inactiveLabel}`}><b>Mi Perfil</b></div>,
              key: 'Perfil',
              children:
                <Flex style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
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
                                value={userLoggedInfo.firstName}
                                onChange={(e) => {
                                  setUserLoggedInfo({ ...userLoggedInfo, firstName: e.target.value });
                                }}
                                disabled={formDisabled}
                                placeholder=""
                              />
                            </Form.Item>
                          </Form>
                        </>
                        <>
                          <Form layout="horizontal">
                            <Form.Item label="Apellidos">
                              <Input
                                className={style.userinfo}
                                value={userLoggedInfo.lastName}
                                onChange={(e) => {
                                  setUserLoggedInfo({ ...userLoggedInfo, lastName: e.target.value });
                                }}
                                disabled={formDisabled}
                                placeholder=""
                              />
                            </Form.Item>
                          </Form>
                        </>
                        <>
                          <Form layout="horizontal">
                            <Form.Item label="">
                              <DatePicker
                                className={style.userinfo}
                                disabled={formDisabled}
                                value=""
                                placeholder=''
                              />
                            </Form.Item>
                          </Form>
                        </>
                        <>
                          <Form layout="horizontal">
                            <Form.Item label="">
                              <Input
                                className={style.userinfo}
                                defaultValue="Email"
                                value={userLoggedInfo.email}
                                disabled={true}
                                placeholder=""
                              />
                            </Form.Item>
                          </Form>
                        </>
                        <Button onClick={handleUpdateUserInfo}>
                          {formDisabled ? 'Editar Datos' : 'Aceptar Cambios'}
                        </Button>
                        <Button onClick={handleUpdateUserInfo}>
                          Mandar datos
                        </Button>
                      </Flex>
                    </Flex>
                  </Card>
                </Flex>
            },
            {
              label: <div className={`${activeTab === 'Reservaciones' ? style.activeLabel : style.inactiveLabel}`}><b>Mis Reservaciones</b></div>,
              key: 'Reservaciones',
              children:
                <div style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                  <SimpleReservation />
                </div>
            },
            {
              label: <div className={`${activeTab === 'Accommodations' ? style.activeLabel : style.inactiveLabel}`}><b>Mis Accommodations</b></div>,
              key: 'Accommodations',
              children:
                <div style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Acommodation />
                </div>
            },
          ]}
        />
      </div>
    </>
  );
};

export default AccountPage;
