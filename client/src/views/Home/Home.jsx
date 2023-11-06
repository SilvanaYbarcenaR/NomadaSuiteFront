import Cards from "../../components/CardsContainer/CardsContainer";
import SecundaryFilters from '../../components/SecundaryFilters/SecundaryFilters';
import banner from '../../assets/image/banner.png';

const Home = () => {
  return (
    <div>
      <img style={{width:"100%"}} src={banner}/>
      <SecundaryFilters />
      <Cards></Cards>
    </div>
  )
};

export default Home;