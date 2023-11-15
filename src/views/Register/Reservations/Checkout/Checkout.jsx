import { getReservationById, getUserData } from "../../../../redux/Actions/actions";
import { Button, Col, Divider, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import style from "./Checkout.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";

const buttonStyle = {
  background: "#231CA7",
  color: "white",
  height: "3rem",
  width: "100%"
};

const Checkout = () => {

  const id = useParams().checkoutId;
  const dispatch = useDispatch();
  const reservationById = useSelector((state) => state.reservationById);
  const userLogged = useSelector((state) => state.userLogged)
  const userId = localStorage.getItem('userId');
  console.log(reservationById);

  useEffect(() => {
    dispatch(getReservationById(id));
    dispatch(getUserData(userId));
    return () => {
      localStorage.removeItem('checkoutData');
    }
  }, [])

  const accommodation = JSON.parse(localStorage.getItem('accommodationData'));
  const checkout = JSON.parse(localStorage.getItem('checkoutData'));
  console.log(accommodation);
  console.log(checkout);

  const name = accommodation.name
  const start_date = checkout?.reservationDetails?.startDate;
  const start = dayjs(start_date).format('DD-MM-YYYY');
  const end_date = checkout?.reservationDetails?.endDate;
  const end = dayjs(end_date).format('DD-MM-YYYY');
  const startDateObj = new Date(start_date);
  const endDateObj = new Date(end_date);
  const timeDifference = endDateObj - startDateObj;
  const nights = timeDifference / (1000 * 3600 * 24);
  const habitacionService = accommodation?.idServices?.find(service => service.name === 'Habitación');
  const quantity = habitacionService ? habitacionService.quantity : null;

  // const idpd = 'http://localhost:3001/api/reservation/checkout/:checkoutId'

  return (
    <div className={style.checkout}>
      <div className={style.columnsBox}>
        <h1>Tu recibo</h1>
        <Row gutter={50}>
          <Col span={12}>
            <div className={style.boxes}>
              <div>
                <h2>{name}</h2>
                <img className={style.imgLogo} src="../../../src/assets/image/logo.png" />
              </div>
              <h3>{nights} noches en {name}</h3>
              <Divider />
              <div className={style.img}>
                <img src={accommodation?.photos[0]} />
              </div>
              <p>{start} ➡ {end}</p>
              <p>Alojamiento ▪ {quantity} habitaciones</p>
              <h6>Anfitrión: {"Nombre del anfitrión"}</h6>
              <h6>Viajero: {userLogged.userName}</h6>
              <Divider />
              <Link to="/cancellation"><h3>Políticas de cancelación</h3></Link>
            </div>
          </Col>
          <Col span={12}>
            <div className={style.boxesRight}>
              <h2>Desglose del precio</h2>
              <span style={{ justifyContent: 'space-between', display: 'flex' }}>
                <p>Tarifa por mes</p>
                <p>{reservationById?.reservation?.monthlyRate} USD</p>
              </span>
              <span style={{ justifyContent: 'space-between', display: 'flex' }}>
                <p>Oferta especial</p>
                <p>-{"0"} USD</p>
              </span>
              <Divider />
              <span style={{ justifyContent: 'space-between', display: 'flex' }}>
                <h3>
                  <b>Total a pagar:</b>
                </h3>
                <p>{reservationById?.reservation?.totalPrice} USD</p>
              </span>
            </div>
            <div className={style.boxesRight}>
              <h2>Pago</h2>
              <span style={{ justifyContent: 'space-between', display: 'flex' }}>
                <p>{"Info. tarjeta"}</p>
                <p>{reservationById?.reservation?.totalPrice} USD</p>
              </span>
              <h6>{"Fecha de pago"}, {"hora de pago"}</h6>
              <Divider />
              <span style={{ justifyContent: 'space-between', display: 'flex' }}>
                <h3>
                  <b>Cantidad abonada</b>
                </h3>
                <p>{reservationById?.reservation?.totalPrice} USD</p>
              </span>
            </div>
            <Link to="/">
              <Button
                block
                htmlType="button"
                style={buttonStyle}
                type="primary"
              >
                Terminar
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  )
};

export default Checkout;