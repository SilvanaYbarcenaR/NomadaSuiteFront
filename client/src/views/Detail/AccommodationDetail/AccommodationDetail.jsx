import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { clearDetail, getAccommodationById } from '../../../redux/Actions/actions';
import { UserOutlined, CarOutlined, RightOutlined, CoffeeOutlined, LaptopOutlined, WifiOutlined, HeartFilled } from '@ant-design/icons';
import { Col, DatePicker, Button, Anchor, Divider, InputNumber, Avatar, Card, Row, Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';



const AccommodationDetail = () => {

  const id = useParams().id;
  const dispatch = useDispatch();
  let AccommodationById = useSelector((state) => state.accommodationById);

  useEffect(() => {
    dispatch(getAccommodationById(id));
    return () => {
      dispatch(clearDetail());
    }
  }, [])


  const { RangePicker } = DatePicker;


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

// carrousel
    const contentStyle = {
        margin: 0,
        marginLeft: '26px',
        height: '275px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        borderRadius: '10px',
  };
  const contentStyle2 = {
    margin: 0,
    height: '130px',
    marginRight: '18px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '10px',
};

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
      

    
return (

    // primera fila

  <>
  {console.log(AccommodationById)}
    <Divider />
        <Row
            gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }}
            >
            <Col className="gutter-row" span={12}>
                <div style={style}>{AccommodationById.name}</div>
                <div style={style2}>{AccommodationById.idLocation?.city}</div>
            </Col>
            <Col className="gutter-row" span={12}>

            </Col>
        </Row>

        {/* end primera fila */}

        {/* imagenes */}

        <Row
            gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }}
            >
                
            <Col className="gutter-row" span={12}>
                <Carousel afterChange={onChange}>
                    <div>
                        <h3 style={contentStyle}><img src={AccommodationById?.photos} alt="Imagen 1" /></h3>
                    </div>
                    <div>
                    <h3 style={contentStyle}><img src={AccommodationById?.photos} alt="Imagen 1" /></h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </Col>
            
            <Col className="gutter-row" span={12}>
                
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
            </Col>                    
        </Row>

        {/* end imagenes */}

        {/* anfitrion */}

        <Row>
        <Col span={16}>
          <div
            id="part-1"
            style={{
              height: '100vh',
              background: 'rgba(255,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                      <p style={{ fontWeight: 'bold', fontSize: '25px' }}>
                          Alojamiento entero. Anfitrión: Jeronimo 
                      </p>

                <Avatar style={{
                    backgroundColor: '#231CA7',
                }} size={64} icon={<UserOutlined />} />
                
                
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: '106px',fontSize: '15px', contentEditable:"false" }}>
                <span>
                2 huéspedes · 1 dormitorio · 1 cama · 2,5 baños
                </span>
            </div>

            {/* end anfitrion */}
            <Divider />
            {/* atributos */}
            
            <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '26px', marginLeft: '26px', fontWeight: 'bold', fontSize: '25px' }}>
            Valoracion del alojamiento 
            </span>
            
            <span style={{ display: 'flex', alignItems: 'center', marginLeft: '30px', fontWeight: 'bold', fontSize: '25px' }}>
              <HeartFilled style={{ marginRight: '20px', fontSize: '25px' }} />
              {AccommodationById.rating}
              
            </span>
           

            <Divider />

            <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '26px' }}>
            {AccommodationById.description}
            </span >
            <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '26px',marginTop: '26px'  }}>
              <Button type="link" style={{fontWeight: 'bold',fontSize: '17px'}}>Saber Más...</Button>
              <RightOutlined />
              
            </span>

            <Divider />

            <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '26px', fontWeight: 'bold', fontSize: '25px' }}>
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

            <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Ciudad%20Aut%C3%B3noma%20de%20Buenos%20Aires,%20Lavalle%201459%20+(Ciudad%20Aut%C3%B3noma%20de%20Buenos%20Aires)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Find Population on Map</a></iframe>

    </div>

    {/* SIDEBAR #231CA7 */}

    <div
      id="part-2"
      style={{
        height: '100vh',
        background: 'rgba(255,0,0,0.02)',
      }}
    />
    <div
      id="part-3"
      style={{
        height: '25vh',
        background: 'rgba(255,0,0,0.02)',
      }}
    >
    
    </div>
  </Col>
    <Col span={8}>
    <Anchor
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
            extra={<a href="#">Precio por 30 dias</a>}
            style={{
              width: 417
            }}
          >
            <RangePicker style={{ display: 'flex', justifyContent: 'space-around' }} size="large" placeholder={['Check-in', 'Check-out']} />
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
                Total a pagar:
              </p>
              <p>
              ${AccommodationById.price} USD
              </p>
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
  
    )
};

export default AccommodationDetail;