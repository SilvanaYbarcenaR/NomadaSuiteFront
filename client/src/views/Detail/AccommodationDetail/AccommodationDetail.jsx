import React from 'react';
import { Col, Divider, Row, Carousel } from 'antd';


const AccommodationDetail = () => {

// filas
    const style = {
        background: '#0092ff',
        padding: '30px 20px 10px 40px',
        fontWeight: 'bold',
        fontSize: '20px',
        
      };
    const style2 = {
        background: '#0092ff',
        padding: '0px 0px 0px 40px',
        textDecoration: 'underline',
        
    };

// carrousel
    const contentStyle = {
        margin: 0,
        marginLeft: '16px',
        height: '275px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
  };
  const contentStyle2 = {
    margin: 0,
    height: '130px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
      

    
return (

    // primera fila

  <>
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
                <div style={style}>Casa en San Luis.</div>
                
            </Col>
        </Row>

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
                    
                <Row gutter={16} >
                    <Col span={12}>
                        <div style={contentStyle2}>3 imagen</div>
                    </Col>
                    <Col span={12}>
                        <div style={contentStyle2}>4 imagen</div>
                    </Col>
                </Row>                
            </Col>                    
        </Row>
        

    {/* segunda fila

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
        </Row> */}
  </>
    )
};

export default AccommodationDetail;