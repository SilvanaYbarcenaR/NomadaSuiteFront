import React, {Component} from 'react';
import Maps from "./GoogleMap";
import { UserOutlined, CarOutlined, RightOutlined, CoffeeOutlined, LaptopOutlined, WifiOutlined, HeartFilled } from '@ant-design/icons';
const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
import { Col, DatePicker, Button, Anchor, Divider, InputNumber, Avatar, Card, Row, Badge, Carousel } from 'antd';



const AccommodationDetail = () => {

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
                <div style={style}>Casa en San Luis.</div>
                <div style={style2}>San Luis, Argentina</div>
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
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
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
                        <div style={contentStyle2}>1 imagen</div>
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
            
            <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '26px', fontWeight: 'bold', fontSize: '25px' }}>
            Sin valoraciones (por ahora)
            </span>
            <HeartFilled style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '46px', marginTop: '26px', fontSize: '25px' }}/>
            

            <Divider />

            <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '26px' }}>
            Este lugar especial está cerca de todo: va a ser muy fácil planear tu visita. Ideal para pasar unos días en San Luis. Queda ubicada en las afueras del centro de la ciudad, ubicación muy cómoda, del Policlínico, la jefatura central de policía, a unos km de casa de gobierno "Terrazas del Portezuelo", buena ubicación para poder salir hacia las sierras (potrero de los Funes, el trapiche, etc) a solo 5 cuadras del parque de las naciones donde existe un parque recreativo para poder hacer ejercicio.
            </span >
            <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '26px',marginTop: '26px'  }}>
              <Button type="link" style={{fontWeight: 'bold',fontSize: '17px'}}>Saber Más...</Button>
              <RightOutlined />
              
            </span>

            <Divider />

            <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '26px', fontWeight: 'bold', fontSize: '25px' }}>
            ¿Qué ofrece este lugar?
            </span>
            <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '46px', marginTop: '46px', fontSize: '35px'  }}>
            <CarOutlined style={{  marginLeft: '16px',marginRight: '26px', }}/><p style={{fontSize: '16px'}}>holasd</p>
            <CoffeeOutlined style={{  marginLeft: '356px',marginRight: '26px', }}/><p style={{fontSize: '16px'}}>holasd</p>
            </span>
            <span style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '46px', marginTop: '46px', fontSize: '35px'  }}>
            <LaptopOutlined style={{  marginLeft: '16px',marginRight: '26px', }}/><p style={{fontSize: '16px'}}>holasd</p>
            <WifiOutlined style={{  marginLeft: '356px',marginRight: '26px', }}/><p style={{fontSize: '16px'}}>holasd</p>
            </span>
            <span style={{ display: 'flex', alignItems: 'center' }}>
            <CarOutlined style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '46px', marginTop: '46px', fontSize: '35px' }}/>
            <CoffeeOutlined style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '356px', marginTop: '26px', fontSize: '35px' }}/>
            </span>
            <span style={{ display: 'flex', alignItems: 'center' }}>
            <CarOutlined style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '46px', marginTop: '46px', fontSize: '35px' }}/>
            <CoffeeOutlined style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '356px', marginTop: '26px', fontSize: '35px' }}/>
            </span>

            <Divider />

            <Maps />


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
              $38 USD
            </span>
          }
            extra={<a href="#"></a>}
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