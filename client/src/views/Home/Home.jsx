import { useSelector, useDispatch } from 'react-redux';
import Cards from "../../components/CardsContainer/CardsContainer";
import { useEffect } from 'react';
import { getAccommodations } from '../../redux/actions/actions';

const Home = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.allAccommodations);
 
  useEffect(() => {
    dispatch(getAccommodations());
  }, [])

  return (
    <div>
      <Cards accommodations={accommodations}></Cards>
    </div>
  )
};

export default Home;