import CardBox from '../CardBox/CardBox';
import CardsStyles from '../CardsContainer/CardsContainer.module.css';
import { Row } from 'antd';

const CardsContainer = ({ accommodations }) => {
  console.log(accommodations);
  return (
    <div className={CardsStyles.cardsContainer}>
      <Row gutter={24}>
        {!accommodations?.length ? 
          <p className={CardsStyles.notFound}>No se encontraron alojamientos.</p> 
          :
          accommodations?.map(({ id, name, photos, rating, price, idLocation }, index) => {
            return (
              <CardBox
                key={index} 
                id={id}
                photos={photos}
                name={name}
                rating={rating}
                price={price}
                location={`${idLocation.city}, ${idLocation.country}`}
              />
            )
          })
        }
      </Row>
    </div>
  )
};

export default CardsContainer;