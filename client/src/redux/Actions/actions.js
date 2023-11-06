/* eslint-disable no-unreachable */
import axios from "axios";
import { GET_ACCOMMODATIONS, GET_ACCOMMODATION_BY_ID, GET_SERVICES, GET_NEXT_ACCOMMODATIONS, ORDER_BY_RATING, GET_FILTERED_ACCOMMODATION, CLEAR_DETAIL, GET_COUNTRIES, GET_CITIES, GET_LOCATIONS } from "./actions-types";

const getAccommodations = () => {
  const endpoint = "http://localhost:3001/api/accommodation/";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_ACCOMMODATIONS,
        payload: data,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};

const getAccommodationById = (id) => {
  const endpoint = `http://localhost:3001/api/accommodation/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_ACCOMMODATION_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
};

const orderByRating = (order) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ORDER_BY_RATING,
        payload: order,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
};

const getNextAccommodations = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_NEXT_ACCOMMODATIONS,
        payload: page,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
}

const getServices = () => {
  const endpoint = 'http://localhost:3001/api/services';
  try {
    return async (dispatch) => {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_SERVICES,
        payload: data
      })
    }
  } catch (error) {
    console.log(error.response.data.error);
  }
};

const getFilteredAccommodation = (values) => {
  console.log(values);
  const { city, country, startDate, endDate, rooms, min, max } = values
  const cityName = city && `city=${city}`
  const countryName = country && `&country=${country}`
  const startDateNum = startDate && `&startDate=${startDate}`
  const endDateNum = endDate && `&endDate=${endDate}`
  const roomsNum = rooms && `&rooms=${rooms}`
  const minPrice = `&min=${min}`
  const maxPrice = max > 0 ? `&max=${max}` : ""
  const endpoint = `http://localhost:3001/api/filtered/combinated?${cityName}${countryName}${roomsNum}${minPrice}${maxPrice}`
  try {
    return async (dispatch) => {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_FILTERED_ACCOMMODATION,
        payload: data
      })
    }
  } catch (error) {
    console.log(error.response.data.error);
  }
}

const getLocations = () => {
  const endpoint = "http://localhost:3001/api/location";
  try {
    return async (dispatch) => {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_LOCATIONS,
        payload: data
      })
    }
  } catch (error) {
    console.log(error.response.data.error);
  }
}

const clearDetail = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_DETAIL,
    });
  }
}

const getCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://www.universal-tutorial.com/api/countries/', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJoaC5yb2JpbnNvbjk1QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IlFrSm5hWUs4OVZfODA3eWV1SkxWQXJJZHVodWxJaThxankwZnBXenNBYno5VjBUTWZPOEpjbllTdzV4OS00Uk1rMzAifSwiZXhwIjoxNjk5MzI1NTU1fQ.-cGaNFLUXikfTm8qRh6vWCkTKQs8ghknqIXA2GJEM2I',
          'Accept': 'application/json',
        }
      })
      dispatch({
        type: GET_COUNTRIES,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};

const getCities = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://www.universal-tutorial.com/api/states/${name}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJoaC5yb2JpbnNvbjk1QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IlFrSm5hWUs4OVZfODA3eWV1SkxWQXJJZHVodWxJaThxankwZnBXenNBYno5VjBUTWZPOEpjbllTdzV4OS00Uk1rMzAifSwiZXhwIjoxNjk5MzI1NTU1fQ.-cGaNFLUXikfTm8qRh6vWCkTKQs8ghknqIXA2GJEM2I',
          'Accept': 'application/json',
        }
      })
      dispatch({
        type: GET_CITIES,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};



export {
  getAccommodations,
  getAccommodationById,
  getServices,
  getNextAccommodations,
  getFilteredAccommodation,
  getCountries,
  getLocations,
  orderByRating,
  getCities,
  clearDetail
}