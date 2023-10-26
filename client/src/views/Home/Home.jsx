import Cards from "../../components/CardsContainer/CardsContainer";

const Home = () => {
  const acomodationArray = [
    {
      "id": "653942f0a1e78d6389d72212",
      "name": "Apartamento Acogedor en el Centro",
      "idServices": [
      {
      "_id": "653942f0a1e78d6389d721f9",
      "name": "Cooking basics",
      "quantity": 1,
      },
      {
      "id": "653942f0a1e78d6389d721f8",
      "name": "Dedicated workspace",
      "quantity": 1,
      },
      {
      "id": "653942f0a1e78d6389d721fe",
      "name": "Parking",
      "quantity": 1,
      "_v": 0
      },
      {
      "id": "653942f0a1e78d6389d72204",
      "name": "Bedroom",
      "quantity": 4,
      }
      ],
      "photos": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119989.jpg?k=92a6dc3c7a5c697494cfbe0664f01f33c7fab4206d994265bbbff971c98e01f3&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119983.jpg?k=af7f0e0a5d52f710f316c194511440c7308d1fd974a560eccab368b18ce4254e&o=&hp=1"
      ],
      "idLocation": {
      "id": "653942f0a1e78d6389d72207",
      "city": "Ciudad Autónoma de Buenos Aires",
      "country": "Argentina",
      "zipCode": "1048",
      "address": "Lavalle 1459",
      "coordinates": "-34.60197580899001, -58.387432843046234",
      },
      "description": "Un apartamento cómodo en el corazón de la ciudad.",
      "price": 100,
      "isActive": true,
      "rating": 5,
      "_v": 0
    },
    {
      "id": "653942f0a1e78d6389d72212",
      "name": "Apartamento Acogedor en el Centro",
      "idServices": [
      {
      "_id": "653942f0a1e78d6389d721f9",
      "name": "Cooking basics",
      "quantity": 1,
      },
      {
      "id": "653942f0a1e78d6389d721f8",
      "name": "Dedicated workspace",
      "quantity": 1,
      },
      {
      "id": "653942f0a1e78d6389d721fe",
      "name": "Parking",
      "quantity": 1,
      "_v": 0
      },
      {
      "id": "653942f0a1e78d6389d72204",
      "name": "Bedroom",
      "quantity": 4,
      }
      ],
      "photos": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119989.jpg?k=92a6dc3c7a5c697494cfbe0664f01f33c7fab4206d994265bbbff971c98e01f3&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119983.jpg?k=af7f0e0a5d52f710f316c194511440c7308d1fd974a560eccab368b18ce4254e&o=&hp=1"
      ],
      "idLocation": {
      "id": "653942f0a1e78d6389d72207",
      "city": "Ciudad Autónoma de Buenos Aires",
      "country": "Argentina",
      "zipCode": "1048",
      "address": "Lavalle 1459",
      "coordinates": "-34.60197580899001, -58.387432843046234",
      },
      "description": "Un apartamento cómodo en el corazón de la ciudad.",
      "price": 100,
      "isActive": true,
      "rating": 5,
      "_v": 0
    },
    {
      "id": "653942f0a1e78d6389d72212",
      "name": "Apartamento Acogedor en el Centro",
      "idServices": [
      {
      "_id": "653942f0a1e78d6389d721f9",
      "name": "Cooking basics",
      "quantity": 1,
      },
      {
      "id": "653942f0a1e78d6389d721f8",
      "name": "Dedicated workspace",
      "quantity": 1,
      },
      {
      "id": "653942f0a1e78d6389d721fe",
      "name": "Parking",
      "quantity": 1,
      "_v": 0
      },
      {
      "id": "653942f0a1e78d6389d72204",
      "name": "Bedroom",
      "quantity": 4,
      }
      ],
      "photos": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119989.jpg?k=92a6dc3c7a5c697494cfbe0664f01f33c7fab4206d994265bbbff971c98e01f3&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119983.jpg?k=af7f0e0a5d52f710f316c194511440c7308d1fd974a560eccab368b18ce4254e&o=&hp=1"
      ],
      "idLocation": {
      "id": "653942f0a1e78d6389d72207",
      "city": "Ciudad Autónoma de Buenos Aires",
      "country": "Argentina",
      "zipCode": "1048",
      "address": "Lavalle 1459",
      "coordinates": "-34.60197580899001, -58.387432843046234",
      },
      "description": "Un apartamento cómodo en el corazón de la ciudad.",
      "price": 100,
      "isActive": true,
      "rating": 5,
      "_v": 0
    },
    {
      "id": "653942f0a1e78d6389d72212",
      "name": "Apartamento Acogedor en el Centro",
      "idServices": [
      {
      "_id": "653942f0a1e78d6389d721f9",
      "name": "Cooking basics",
      "quantity": 1,
      },
      {
      "id": "653942f0a1e78d6389d721f8",
      "name": "Dedicated workspace",
      "quantity": 1,
      },
      {
      "id": "653942f0a1e78d6389d721fe",
      "name": "Parking",
      "quantity": 1,
      "_v": 0
      },
      {
      "id": "653942f0a1e78d6389d72204",
      "name": "Bedroom",
      "quantity": 4,
      }
      ],
      "photos": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119989.jpg?k=92a6dc3c7a5c697494cfbe0664f01f33c7fab4206d994265bbbff971c98e01f3&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119983.jpg?k=af7f0e0a5d52f710f316c194511440c7308d1fd974a560eccab368b18ce4254e&o=&hp=1"
      ],
      "idLocation": {
      "id": "653942f0a1e78d6389d72207",
      "city": "Ciudad Autónoma de Buenos Aires",
      "country": "Argentina",
      "zipCode": "1048",
      "address": "Lavalle 1459",
      "coordinates": "-34.60197580899001, -58.387432843046234",
      },
      "description": "Un apartamento cómodo en el corazón de la ciudad.",
      "price": 100,
      "isActive": true,
      "rating": 5,
      "_v": 0
    },
    {
      "id": "653942f0a1e78d6389d72212",
      "name": "Apartamento Acogedor en el Centro",
      "idServices": [
      {
      "_id": "653942f0a1e78d6389d721f9",
      "name": "Cooking basics",
      "quantity": 1,
      },
      {
      "id": "653942f0a1e78d6389d721f8",
      "name": "Dedicated workspace",
      "quantity": 1,
      },
      {
      "id": "653942f0a1e78d6389d721fe",
      "name": "Parking",
      "quantity": 1,
      "_v": 0
      },
      {
      "id": "653942f0a1e78d6389d72204",
      "name": "Bedroom",
      "quantity": 4,
      }
      ],
      "photos": [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119989.jpg?k=92a6dc3c7a5c697494cfbe0664f01f33c7fab4206d994265bbbff971c98e01f3&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/317119983.jpg?k=af7f0e0a5d52f710f316c194511440c7308d1fd974a560eccab368b18ce4254e&o=&hp=1"
      ],
      "idLocation": {
      "id": "653942f0a1e78d6389d72207",
      "city": "Ciudad Autónoma de Buenos Aires",
      "country": "Argentina",
      "zipCode": "1048",
      "address": "Lavalle 1459",
      "coordinates": "-34.60197580899001, -58.387432843046234",
      },
      "description": "Un apartamento cómodo en el corazón de la ciudad.",
      "price": 100,
      "isActive": true,
      "rating": 5,
      "_v": 0
    }    
  ]
  return (
    <div>
      <Cards accommodations={acomodationArray}></Cards>
    </div>
  )
};

export default Home;