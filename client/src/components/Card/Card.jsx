import CardStyles from '../Card/Card.module.css';
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Card = (/* { id, images, title, dateRange, valoration, price } */) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className={CardStyles.card}>
            {/* <NavLink to={`/detail/${id}`}> */}
            <Slider {...settings}>
                <div>
                    <h3></h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
                {/* <h2>{title}</h2>
                <div>{dateRange}</div>
                <div>{valoration}</div>
                <div>{price}</div> */}
            {/* </NavLink> */}
        </div>
    )
};

export default Card;