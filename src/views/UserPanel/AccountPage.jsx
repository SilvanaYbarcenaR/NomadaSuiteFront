import React, { useState, useEffect } from 'react';
import axios from "axios";
import dayjs from 'dayjs';
import moment from "moment";
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

  const [formDisabled, setFormDisabled] = useState(true);
  const toggleForm = () => {
    setFormDisabled(!formDisabled);
  };

  const [activeTab, setActiveTab] = useState('Perfil');

  const dispatch = useDispatch();
  const userLoggedInfoFromRedux = useSelector((state) => state.userLogged);

  console.log(userLoggedInfoFromRedux.birthdate);

  

  const [userLoggedInfo, setUserLoggedInfo] = useState({
    firstName: "",
    lastName: "",
    birthdate: moment(userLoggedInfoFromRedux.birthdate).format("YYYY-MM-DD"),
  });


  const userId=userLoggedInfoFromRedux._id;
console.log(userLoggedInfoFromRedux)


  const handleUpdateUserInfo = async () => {
    // Realiza una solicitud PUT para actualizar el nombre y apellido del usuario
    await axios.put(`/user/update/${userId}`, {

      
      firstName: userLoggedInfo.firstName,
      lastName: userLoggedInfo.lastName,
      birthdate: userLoggedInfo.birthdate,
      })
  
  };

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  useEffect(() => {
    setUserLoggedInfo({
      firstName: userLoggedInfoFromRedux.firstName,
      lastName: userLoggedInfoFromRedux.lastName,
      birthdate: moment(userLoggedInfoFromRedux.birthdate).format("YYYY-MM-DD"),
    });
    console.log(moment(userLoggedInfo.birthdate));
    console.log(dayjs(userLoggedInfoFromRedux.birthdate));
  }, [userLoggedInfoFromRedux]);

  const calculateAge = (birthdate) => {
    const currentDate = new Date();
    const birthdateDate = new Date(birthdate);
    const age = currentDate.getFullYear() - birthdateDate.getFullYear();
    return age;
  };

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
                            <Form.Item label="">
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
                        {console.log(userLoggedInfo.birthdate)}
                        <>
                        <Form layout="horizontal">
                          <Form.Item label="">
                            <DatePicker
                              className={style.userinfo}
                              disabled={formDisabled}
                              value={userLoggedInfo.birthdate ? dayjs(userLoggedInfo.birthdate,"YYYY-MM-DD") : null}
                              onChange={(date, dateString) => {
                                setUserLoggedInfo({ ...userLoggedInfo, birthdate: dateString });
                              }}
                              disabledDate={(current) => {
                                // Deshabilitar fechas donde la edad sea menor que 18 años
                                return calculateAge(current) < 18;
                              }}
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
                                value={userLoggedInfoFromRedux.email}
                                disabled={true}
                                placeholder=""
                              />
                            </Form.Item>
                          </Form>
                        </>
                        <Button onClick={() => { handleUpdateUserInfo(); toggleForm(); }}>
                          {formDisabled ? 'Editar Datos' : 'Aceptar Cambios'}
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
