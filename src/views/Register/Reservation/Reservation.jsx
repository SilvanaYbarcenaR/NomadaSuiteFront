import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { clearDetail, getAccommodationById } from '../../../redux/Actions/actions';
import { Col, DatePicker, Button, Anchor, Divider, InputNumber, Card, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { BsBoxArrowLeft } from "react-icons/bs"
import style from './Reservation.module.css';
import axios from 'axios';

dayjs.extend(customParseFormat);
const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
  width: "50%",
  marginTop: "1rem"
};

const AccommodationDetail = () => {

  const id = useParams().id;
  const dispatch = useDispatch();
  let AccommodationById = useSelector((state) => state.accommodationById);
  console.log(AccommodationById);
  const [total, setTotal] = useState(AccommodationById?.price);

  useEffect(() => {
    dispatch(getAccommodationById(id));
    return () => {
      dispatch(clearDetail());
    }
  }, [])

  const handle = () => {
    const URL = 'https://nomada-suite.onrender.com/api'
    // const URL = 'http://localhost:3001/api'
    axios.post(`${URL}/stripe/charge`, {
      "line_items": [
        {
          "price_data": {
            "product_data": {
              "name": "Alojamiento en Apartamento Acogedor en el Centro de Buenos Aires, Argentina"
            },
            "currency": "usd",
            "unit_amount": 10000
          },
          "quantity": 1
        }
      ],
      "duration": {
        "start_date": "2023-11-07",
        "end_date": "2023-12-07"
      }
    }).then((response) => {
      window.location.href = response.data.url;
    });
  };

  return (
    <div className={style.reservationBox}>
      <div className={style.columnsBox}>
        <Row>
          <Col span={16}>
            <div className={style.detailContent}>
              <div className={style.returnReservation}>
                <Button style={{
                  backgroundColor: '#231CA7',
                }} size={64} icon={<BsBoxArrowLeft />} />
                <p style={{ fontWeight: 'bold', fontSize: '25px' }}>
                  Solicita reservar
                </p>
              </div>

              <Divider />

              <h4 className={style.detailTitle}>Tu viaje</h4>
              <div className={style.fechas}>
                <h5>Fechas</h5>
                <p>07 Nov - 07 Oct</p>
              </div>
              <div className={style.habitaciones}>
                <h5>Habitaciones</h5>
                <p>3 Habitaciones</p>
              </div>

              <Divider />

              <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontWeight: 'bold', fontSize: '25px', paddingBottom: '.3rem' }}>
                Política de cancelación
              </span>
              <p>Si cancelas antes del check-in el 6 nov., recibirás un reembolso parcial. Después de eso, tu reembolso depende de cuándo canceles. <Link to="/cancellation" style={{ fontWeight: 500 }} rel="noopener noreferrer">Más información</Link></p>

              <Divider />

              <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontWeight: 'bold', fontSize: '25px', paddingBottom: '.3rem' }}>
                Reglas fundamentales
              </span>
              <p>Pedimos a todos los huéspedes que recuerden algunas cosas sencillas sobre lo que hace que un huésped sea excelente.</p>
              <p>☑ Sigue las reglas de la casa.</p>
              <p>☑ Trata el alojamiento del anfitrión como si fuera tuyo.</p>

              <Divider />
              <p className={style.pSubmit}>Al seleccionar el botón que aparece a continuación, acepto las siguientes políticas: Reglas del anfitrión de la casa, Reglas fundamentales para los huéspedes. Acepto pagar el monto total indicado si el anfitrión acepta mi solicitud de reservación.</p>
              <Button
                onClick={handle}
                style={buttonStyle}
                type="primary"
                htmlType="submit"
              >
                Realizar el pago
              </Button>

            </div>
          </Col>
          <Col span={8}>
            <div className={style.detailContent2}>
              <Anchor
                className={style.checkout}
                replace
                items={[
                  {
                    key: 'reservar',
                    href: '#part-1',
                    title: (
                      <Card
                       /*  title={
                          <img src={AccommodationById.photos} />
                        } */
                        /* extra={<a href="#">Precio por 30 días</a>} */
                      >
                        <Divider />
                        <span style={{ fontSize: '20px', justifyContent: 'space-between', display: 'flex' }}>
                          <p>
                            <b>Informacion del precio</b>
                          </p>
                        </span>
                        <span style={{ fontSize: '20px', justifyContent: 'space-between', display: 'flex' }}>
                          <p>
                            <b>Tarifa por servicio</b>
                          </p>
                          <p>{total} USD</p>
                        </span>
                        <p></p>
                        <Button
                          type="reserv"
                          block
                          onClick={handle}
                          style={{
                            backgroundColor: 'orange',
                            color: 'black',
                            marginTop: '40px',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s, color 0.3s',
                          }}
                        >
                          Realizar el pago
                        </Button>

                        <Divider />

                        <span style={{ fontSize: '20px', justifyContent: 'space-between', display: 'flex' }}>
                          <p>
                            <b>Total a pagar:</b>
                          </p>
                          <p>{total} USD</p>
                        </span>

                      </Card>
                    ),
                  },
                ]}
              />
            </div>
          </Col>
        </Row>
      </div >
    </div >
  )
};

export default AccommodationDetail;