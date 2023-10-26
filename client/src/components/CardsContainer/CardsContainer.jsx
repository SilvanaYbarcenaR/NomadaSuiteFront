import CardBox from '../CardBox/CardBox';
import CardsStyles from '../CardsContainer/CardsContainer.module.css';
import { Row } from 'antd';

const CardsContainer = ({ accommodations }) => {
  return (
    <div className={CardsStyles.cardsContainer}>
      <Row gutter={24} align={'stretch'}>
        {!accommodations?.length ? 
          <p className={CardsStyles.notFound}>No se encontraron alojamientos.</p> 
          :
          accommodations?.map((accommodations, index) => {
            return (
              <CardBox
                key={index} 
                id={accommodations?._id}
                photos={accommodations?.photos}
                name={accommodations?.name}
                rating={accommodations?.rating}
                price={accommodations?.price}
                location={`${accommodations?.idLocation.city}, ${accommodations?.idLocation.country}`}
              />
            )
          })
        }
      </Row>
    </div>
  )
};

export default CardsContainer;