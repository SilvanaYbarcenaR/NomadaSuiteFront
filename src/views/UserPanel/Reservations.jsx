import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardsStyles from '../../components/CardsContainer/CardsContainer.module.css';
import Cardbox from "../../components/CardBox/CardBox";
import { DatePicker, Space, Row, Col, Divider, Input, Rate } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const { TextArea } = Input;

let fechaActualizada; // Declarar la variable fuera del bloque fetch

fetch('http://worldtimeapi.org/api/ip')
  .then(response => response.json())
  .then(data => {
    // La respuesta contiene la información de fecha y hora
    var fechaHoraInternet = new Date(data.utc_datetime);

    // Obtiene el año, mes y día
    var ano = fechaHoraInternet.getUTCFullYear();
    var mes = ('0' + (fechaHoraInternet.getUTCMonth() + 1)).slice(-2); // Añade un cero inicial y toma los últimos dos dígitos
    var dia = ('0' + fechaHoraInternet.getUTCDate()).slice(-2); // Añade un cero inicial y toma los últimos dos dígitos

    // Formatea la fecha en el formato deseado
    fechaActualizada = ano + '-' + mes + '-' + dia;

    console.log('Fecha actual según Internet (formato YYYY-MM-DD):', fechaActualizada);

    // Puedes realizar cualquier acción adicional con la fecha actualizada aquí
    // ...

    // Ahora la variable fechaActualizada tiene el valor correcto
  })
  .catch(error => console.error('Error al obtener la fecha y hora desde Internet:', error));

// Puedes usar la variable fechaActualizada aquí fuera del bloque fetch
console.log('Fecha actual fuera del bloque fetch:', fechaActualizada);

console.log(fechaActualizada)
const fechaActual = fechaActualizada;
console.log(fechaActual)

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';


const Reservation = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [accommodationDataArray, setAccommodationDataArray] = useState([]);

  

  useEffect( async ()=> {
    try {
      const response = await axios.get(`http://localhost:3001/api/reservation/${userId}`);
      console.log(response.data);
      // Aquí deberías manejar la respuesta según la estructura de datos que recibas
      setData(response.data);      
    } catch (error) {
      console.error('Error al obtener las reservaciones:', error);
    }
  }, []);

  let idAccommodationArray;
  useEffect(() => {
    const idAccommodationArray = data.map(item => item.idAccommodation);
    console.log('IdAccommodation Array:', idAccommodationArray);
  }, [data]);
  console.log(idAccommodationArray)
  console.log(fechaActual)
  

  useEffect(() => {
    const fetchAccommodationData = async () => {
      const idAccommodationArray = data.map((item) => item.idAccommodation);
      // Itera sobre los IDs y obtén la información de cada alojamiento
      const accommodationDataArray = await Promise.all(
        idAccommodationArray.map(async (id) => {
          try {
            const accommodationResponse = await axios.get(`http://localhost:3001/api/accommodation/${id}`);
            return accommodationResponse.data; // Contiene la información del alojamiento
          } catch (error) {
            console.error(`Error al obtener la información del alojamiento ${id}:`, error);
            return null;
          }
        })
      );
      setAccommodationDataArray(accommodationDataArray);
      // accommodationDataArray ahora contiene la información de todos los alojamientos asociados a las reservas
      console.log('Accommodation Data Array:', accommodationDataArray);
    };

    fetchAccommodationData();
  }, [data]);

  return (
    <div className={CardsStyles.cardsContainer}>
      {console.log(data)}
      <div className={CardsStyles.noScroll}>
        <Row gutter={24} align={'stretch'}>
          {data.length &&
            data?.map((reservation, index) => {
              const accommodationInfo = accommodationDataArray[index];
              return (
                <Col key={index} span={24}>
                  <div style={{ borderRadius: '20px', border: '1px solid #eee', padding: '10px', margin: '10px', display: 'flex', justifyContent: 'space-evenly' }}>
                  
                  <Cardbox 
                    key={index}
                    id={accommodationInfo?._id}
                    photos={accommodationInfo?.photos}
                    name={accommodationInfo?.name}
                    rating={accommodationInfo?.rating}
                    price={accommodationInfo?.price}
                    location={`${accommodationInfo?.idLocation?.city}, ${accommodationInfo?.idLocation?.country}`}
                  />
                  
                  {console.log(reservation.idAccommodation)}
                    <div>
                      <Space direction="vertical" size={12}>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }} >
                          <span style={{ marginRight: '79px', fontWeight: 'bold' }}>Check In</span>
                          <DatePicker
                            defaultValue={dayjs(reservation.startDate, dateFormat)}
                            format={dateFormat}
                            allowClear={false}
                            disabledDate={(current) => current && current < dayjs().endOf('day')}
                            open={false}
                            inputReadOnly={true}
                          />
                        </div>
                      </Space>

                      <Divider />

                      <Space direction="vertical" size={12}>
                        <div style={{ display: 'flex', alignItems: 'center' }} >
                          <span style={{ marginRight: '70px', fontWeight: 'bold' }}>Check Out</span>
                          <DatePicker
                            defaultValue={dayjs(reservation.endDate, dateFormat)}
                            format={dateFormat}
                            allowClear={false}
                            disabledDate={(current) => current && current < dayjs().endOf('day')}
                            open={false}
                            inputReadOnly={true}
                          />
                        </div>
                      </Space>

                      <Divider />
                      
                      <Space direction="vertical" size={12}>
                        <div style={{ display: 'flex', alignItems: 'center' }} >
                          <span style={{ marginRight: '70px', fontWeight: 'bold' }}>Dias Reservados:</span>
                          {/* Aquí debes mostrar la información correcta de los días reservados */}
                          <span style={{ fontWeight: 'bold', marginLeft: '50px' }}>{reservation.daysReserved}</span>
                        </div>
                      </Space>

                      <Divider />
                      
                      <Space direction="vertical" size={12}>
                        <div style={{ display: 'flex', alignItems: 'center' }} >
                          <span style={{ marginRight: '80px', fontWeight: 'bold', fontSize: '20px' }}>Total Pagado:</span>
                          {/* Aquí debes mostrar la información correcta del total pagado */}
                          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>${reservation.totalPrice}</span>
                        </div>
                      </Space>

                      <Divider />

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

                        <span style={{ marginBottom: '30px',fontWeight: 'bold',fontSize: '15px',backgroundColor: 'blue',color: 'white',borderRadius: '10px',padding: '10px' 
                          }}>Ingresa tu Review</span>
                          <Rate defaultValue={0} disabled={reservation.endDate > fechaActual} style={{ marginBottom: '15px' }} />
                          <TextArea rows={4} placeholder="Describe tu experiencia" maxLength={150} disabled={reservation.endDate > fechaActual} />
                        <span className="ant-rate-text"></span>

                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
};

export default Reservation;