import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardsStyles from '../../components/CardsContainer/CardsContainer.module.css';
import { Row, Col } from 'antd';

const Accommodation = ({ userId }) => {
  const [data, setData] = useState([]);
console.log(userId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/accomodation/user/${userId}`);
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
                <div>{accommodation.name}</div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default Accommodation;
