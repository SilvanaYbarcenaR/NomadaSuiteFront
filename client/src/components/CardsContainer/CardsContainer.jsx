import Card from '../Card/Card';
import CardsStyles from '../CardsContainer/CardsContainer.module.css';

const CardsContainer = ({ accommodations }) => {
    return (
        <div className={CardsStyles.cardsContainer}>
        {!accommodations?.length ? 
          <p className={CardsStyles.notFound}>No se encontraron alojamientos.</p> 
          :
          accommodations?.map(({ id, title, images, dateRange, valoration, price }) => {
            return (
              <Card
                key={id} 
                id={id}
                images={images}
                title={title}
                dateRange={dateRange}
                valoration={valoration}
                price={price}
              />
            )
          })
        }
      </div>
    )
};

export default CardsContainer;