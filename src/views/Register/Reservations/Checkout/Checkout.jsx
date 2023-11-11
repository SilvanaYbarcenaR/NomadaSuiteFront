import { Col, Divider, Row } from "antd";
import style from "./Checkout.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Checkout = () => {

  const accommodationToReservation = useSelector((state) => state.accommodationToReservation);
  console.log(accommodationToReservation)

  return (
    <div className={style.checkout}>
      <div className={style.columnsBox}>
        <h1>Tu recibo</h1>
        <Row gutter={50}>
          <Col span={12}>
            <div className={style.boxes}>
              <div>
                <h2>{"Nombre del alojamiento"}</h2>
                <img className={style.imgLogo} src="../../../src/assets/image/logo.png" />
              </div>
              {/* <Carousel className={detailStyles.carouselContainerDetail} arrows>
                {
                  AccommodationById?.photos?.map((photo, index) => {
                    return (
                      <div key={index} className={detailStyles.carouselSlide}><img src={photo} /></div>
                      )
                    })
                  }
                </Carousel> */}
              <h3>{"Cantidad de noches"} en {"Alojamiento"}</h3>
              <Divider />
              <img className={style.img} src="../../../src/assets/image/logo.png" />
              <p>{"Start_date"} ➡ {"End_date"}</p>
              <p>Alojamiento ▪ {"Número de habitaciones"}</p>
              <h6>Anfitrión: {"Nombre del anfitrión"}</h6>
              <h6>Viajero: {"Nombre del nómada"}</h6>
              <Divider />
              <Link to="/cancellation"><h3>Políticas de cancelación</h3></Link>
            </div>
          </Col>
          <Col span={12}>
            <div className={style.boxesRight}>
              <h2>Desglose del precio</h2>
              <span style={{ justifyContent: 'space-between', display: 'flex' }}>
                <p>Tarifa por servicio</p>
                <p>{"precio"} USD</p>
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
                <p>{"precio"} USD</p>
              </span>
            </div>
            <div className={style.boxesRight}>
              <h2>Pago</h2>
              <span style={{ justifyContent: 'space-between', display: 'flex' }}>
                <p>{"Info. tarjeta"}</p>
                <p>{"precio"} USD</p>
              </span>
              <h6>{"Fecha de pago"}, {"hora de pago"}</h6>
              <Divider />
              <span style={{ justifyContent: 'space-between', display: 'flex' }}>
                <h3>
                  <b>Cantidad abonada</b>
                </h3>
                <p>{"precio"} USD</p>
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
};

export default Checkout;