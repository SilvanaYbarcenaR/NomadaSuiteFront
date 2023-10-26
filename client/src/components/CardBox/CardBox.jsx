import CardStyles from './CardBox.module.css';
import { NavLink } from 'react-router-dom';
import { Card, Col, Row, Carousel, Flex } from 'antd';
import { AiFillStar } from 'react-icons/ai';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";

const CardBox = ({ id, name, photos, rating, price, location }) => {
    return (
      <Col xs={12} sm={8} xl={6} xxl={4}>
        {console.log(photos)}
        <div className={CardStyles.card}>
          <NavLink to={`/detail/${id}`}>
            <Card bordered={false}>
              <Carousel arrows prevArrow={<BsArrowLeftCircleFill />} nextArrow={<BsArrowRightCircleFill />}>
                {photos?.map((photo, index) => {
                  return (
                    <div key={index} className={CardStyles.carouselContainer}>
                      <img src={photo}/>
                    </div>
                  )
                })}
              </Carousel>
              <div className={CardStyles.cardDescription}>
                <Flex gap="middle" justify={'space-between'} align="flex-start">
                  <h2 className={CardStyles.cardTitle}>{name}</h2>
                  <Flex gap="3px" align="center">
                    <AiFillStar/> {rating}
                  </Flex>
                </Flex>
                <p className={CardStyles.location}>{location}</p>
                <div className={CardStyles.price}><span>${price}</span> / mes</div>
              </div>
            </Card>
          </NavLink>
        </div>
      </Col>
    )
};

export default CardBox;