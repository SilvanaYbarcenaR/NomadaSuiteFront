import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { clearDetail, getAccommodationById } from '../../../redux/Actions/actions';
import { UserOutlined, CarOutlined, CoffeeOutlined, LaptopOutlined, WifiOutlined } from '@ant-design/icons';
import { Col, DatePicker, Button, Anchor, Divider, InputNumber, Avatar, Card, Row, Carousel, Flex, Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import detailStyles from './AccommodationDetail.module.css';

dayjs.extend(customParseFormat);

const AccommodationDetail = () => {

  const id = useParams().id;
  const dispatch = useDispatch();
  let AccommodationById = useSelector((state) => state.accommodationById);
  const [total, setTotal] = useState(AccommodationById?.price);

  useEffect(() => {
    dispatch(getAccommodationById(id));
    return () => {
      dispatch(clearDetail());
    }
  }, [])

  const { RangePicker } = DatePicker;

  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day');
  };

// filas
  const style = {
      background: "",
      padding: '30px 20px 10px 40px',
      fontWeight: 'bold',
      fontSize: '20px',
      
    };
  const style2 = {
      background: '',
      padding: '0px 0px 20px 40px',
      textDecoration: 'underline',
      
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const onRangeChange = (dates, dateStrings) => {
    const days = Math.abs(new Date(dateStrings[1]) - new Date(dateStrings[0])) / (1000 * 3600 * 24);
    const totalPrice = (days * AccommodationById.price / 30).toFixed(2);
    setTotal(totalPrice);
  };
      
return (
    // primera fila
  <>
  {console.log(AccommodationById)}
    <Divider />
      <Row>
        <Col className="gutter-row" span={12}>
          <h1 style={style}>{AccommodationById.name}</h1>
          <div style={style2}>{AccommodationById.idLocation?.city}, {AccommodationById.idLocation?.country}</div>
        </Col>
        <Col className="gutter-row" span={12}>
        </Col>
      </Row>

      {/* end primera fila */}

      {/* imagenes */}

      <Row>   
        <Col className="gutter-row" span={24}>
          <Carousel afterChange={onChange} className={detailStyles.carouselContainer}>
            {
              AccommodationById?.photos?.map((photo, index) => {
                return (
                  <div key={index} className={detailStyles.carouselSlide}><img src={photo} /></div>
                )
              })
            }
          </Carousel>
        </Col>
        
        {/* <Col className="gutter-row" span={12}>
          <Row gutter={16} style={{ marginBottom: '15px' }}>
              <Col span={12}>
              <div style={contentStyle2}>
                <img src={AccommodationById?.photos} alt="Imagen 1" />
              </div>
              </Col>
              <Col span={12}>
                  <div style={contentStyle2}>2 imagen</div>
              </Col>
          </Row>
              
          <Row gutter={16} style={{ marginBottom: '40px' }} >
              <Col span={12}>
                  <div style={contentStyle2}>3 imagen</div>
              </Col>
              <Col span={12}>
                  <div style={contentStyle2}>4 imagen</div>
              </Col>
          </Row>                
        </Col>       */}              
      </Row>

      {/* end imagenes */}

      {/* anfitrion */}

      <Row>
        <Col span={16}>
          <div className={detailStyles.detailContent}>
            <Flex justify={"space-between"}>
              <p style={{ fontWeight: 'bold', fontSize: '25px' }}>
                Alojamiento entero. Anfitrión: Jeronimo 
              </p>

              <Avatar style={{
                backgroundColor: '#231CA7',
              }} size={64} icon={<UserOutlined />} />
                   
            </Flex>
            <div>
              <span>
                2 huéspedes · 1 dormitorio · 1 cama · 2,5 baños
              </span>
            </div>

            {/* end anfitrion */}

            <Divider />

            <h4 className={detailStyles.detailTitle}>Descripción</h4>
            <p>{AccommodationById.description}</p>
            
            {/* <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '26px',marginTop: '26px'  }}>
              <Button type="link" style={{fontWeight: 'bold',fontSize: '17px'}}>Saber Más...</Button>
              <RightOutlined /> 
            </span> */}

            <Divider />

            <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontWeight: 'bold', fontSize: '25px' }}>
              ¿Qué ofrece este lugar?
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '46px', fontSize: '35px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CoffeeOutlined style={{ fontSize: '35px', marginBottom: '8px', height: '50px' }} />
                <p style={{ fontSize: '16px', margin: '0' }}>Cocina</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CarOutlined style={{ fontSize: '35px', marginBottom: '8px', height: '50px' }} />
                <p style={{ fontSize: '16px', margin: '0' }}>Cochera</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '46px', fontSize: '35px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LaptopOutlined style={{ fontSize: '35px', marginBottom: '8px', height: '50px' }} />
                <p style={{ fontSize: '16px', margin: '0' }}>Escritorio</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <WifiOutlined style={{ fontSize: '35px', marginBottom: '8px', height: '50px' }} />
                <p style={{ fontSize: '16px', margin: '0' }}>Wifi</p>
              </div>
            </div>

            <Divider />
            
            <h4 className={detailStyles.detailTitle}>Ubicación</h4>
            <iframe width="100%" height="400" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Ciudad%20Aut%C3%B3noma%20de%20Buenos%20Aires,%20Lavalle%201459%20+(Ciudad%20Aut%C3%B3noma%20de%20Buenos%20Aires)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Find Population on Map</a></iframe>
            
            <Divider />

            <div className={detailStyles.valoration}>
              <h4 className={detailStyles.detailTitle}>Valoración del alojamiento</h4>
              <Flex align={"center"}>
                <Rate disabled value={AccommodationById.rating} />
                <span className={detailStyles.valorationNumber}>{AccommodationById?.rating}</span>
              </Flex>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <Anchor
          className={detailStyles.checkout}
          replace
          items={[
            {
              key: 'reservar',
              href: '#part-1',
              title: (
                <Card
                title={
                  <span style={{ fontSize: '26px' }}>
                    ${AccommodationById.price} USD
                  </span>
                }
                  extra={<a href="#">Precio por 30 días</a>}
                  style={{
                    width: 417
                  }}
                >
                  <RangePicker style={{ display: 'flex', justifyContent: 'space-around' }} size="large" placeholder={['Check-in', 'Check-out']} disabledDate={disabledDate} onChange={onRangeChange} />
                  <InputNumber placeholder={"Huéspedes"} size="large" min={1} max={10} onChange={onChange} type='number' 
                    style={{
                      marginTop: '15px',
                      width: 367,
                    }}
                  />
                  <p></p>
                  <Button
                    type="reserv"
                    block
                    style={{
                      backgroundColor: 'orange',
                      color: 'black',
                      marginTop: '40px',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s, color 0.3s', // Agregar transición suave
                    }}
                    >
                    Reservar
                  </Button>

                  <Divider />

                  <span style={{ fontSize: '20px', justifyContent: 'space-between',display: 'flex' }}>
                    <p>
                      <b>Total a pagar:</b>
                    </p>
                    <p>{total} USD</p>
                  </span>

                </Card>

              // end sidebar

              ),
            },
          ]}
        />
      </Col>
    </Row>                 
  </>
)};

export default AccommodationDetail;