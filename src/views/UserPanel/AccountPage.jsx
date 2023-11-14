import React, { useState, useEffect } from 'react';
import axios from "axios";
import dayjs from 'dayjs';
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserData } from "../../redux/Actions/actions";
import { updateUserInfo } from "../../redux/Actions/actions";
import style from "../UserPanel/AccountPage.module.css";
import { Button, Form, Input, Card, Flex, DatePicker, Tabs } from 'antd';
import Photo from "../UserPanel/Photo/PhotoAcc";
import Reservations from "../UserPanel/Reservations";
import Accommodation from "../UserPanel/Accommodation";

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
    password: "",
    birthdate: moment(userLoggedInfoFromRedux.birthdate).format("YYYY-MM-DD"),
  });


  const userId=userLoggedInfoFromRedux._id;
console.log(userLoggedInfoFromRedux)


  const handleUpdateUserInfo = async () => {
    // Realiza una solicitud PUT para actualizar el nombre y apellido del usuario
    await axios.put(`/user/update/${userId}`, {

      
      firstName: userLoggedInfo.firstName,
      lastName: userLoggedInfo.lastName,
      password: userLoggedInfo.password,
      birthdate: userLoggedInfo.birthdate,
      })
  
  };

  useEffect(() => {
    window.location.hash = `/${activeTab}`;
  }, [activeTab]);

  useEffect(() => {
    setUserLoggedInfo({
      firstName: userLoggedInfoFromRedux.firstName,
      lastName: userLoggedInfoFromRedux.lastName,
      password: userLoggedInfoFromRedux.password,
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
              label: 
              <NavLink 
              to="/account#/Perfil"
              className={`${activeTab === 'Perfil' ? style.activeLabel : style.inactiveLabel}`}><b>Mi Perfil</b></NavLink>,
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
                      <Photo userId={userId} />
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
                        <>
                          <Form layout="horizontal">
                            <Form.Item label="">
                              <Input
                                className={style.userinfo}
                                value={userLoggedInfo.password}
                                onChange={(e) => {
                                  setUserLoggedInfo({ ...userLoggedInfo, password: e.target.value });
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
              label: 
              <NavLink
              to="/account#/Reservaciones"
              className={`${activeTab === 'Reservaciones' ? style.activeLabel : style.inactiveLabel}`}><b>Mis Reservaciones</b></NavLink>,
              key: 'Reservaciones',
              children:
                <div style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Reservations userId={userId} />
                </div>
            },
            {
              label: 
              <NavLink
              to="/account#/Accommodations"
              className={`${activeTab === 'Accommodations' ? style.activeLabel : style.inactiveLabel}`}><b>Mis Alojamientos</b></NavLink>,
              key: 'Accommodations',
              children:
                <div style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Accommodation userId={userId} />
                </div>
            },
          ]}
        />
      </div>
    </>
  );
};

export default AccountPage;
