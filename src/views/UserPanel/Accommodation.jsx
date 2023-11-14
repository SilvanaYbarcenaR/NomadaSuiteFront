import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardsStyles from '../../components/CardsContainer/CardsContainer.module.css';
import Cardbox from "../../components/CardBox/CardBox";
import { Row, Col } from 'antd';

const Accommodation = ({ userId }) => {
  const [data, setData] = useState([]);
console.log(userId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/accommodation/user/${userId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener las reservaciones:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className={CardsStyles.cardsContainer}>
      <div className={CardsStyles.noScroll}>
        <Row gutter={24} align={'stretch'}>
          {data.length &&
            data?.map((accommodation, index) => (
              <Col key={index} span={24}>
                <div style={{ borderRadius: '20px', border: '1px solid #eee', padding: '10px', margin: '10px', display: 'flex', justifyContent: 'space-evenly' }}>
                  <Cardbox 
                    key={index}
                    id={accommodation._id}
                    photos={accommodation.photos}
                    name={accommodation.name}
                    rating={accommodation.rating}
                    price={accommodation.price}
                    location={`${accommodation.idLocation?.city}, ${accommodation.idLocation?.country}`}
                  />
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default Accommodation;
