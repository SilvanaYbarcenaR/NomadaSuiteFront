import { useSelector, useDispatch } from 'react-redux';
import Cards from "../../components/CardsContainer/CardsContainer";
import { useEffect } from 'react';
import { getAccommodations } from '../../redux/actions/actions';
import SecundaryFilters from '../../components/SecundaryFilters/SecundaryFilters';

const Home = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations);
 
  useEffect(() => {
    dispatch(getAccommodations());
  }, [])

  return (
    <div>
      <SecundaryFilters/>
      <Cards accommodations={accommodations}></Cards>
    </div>
  )
};

export default Home;