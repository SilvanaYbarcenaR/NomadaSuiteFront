/* eslint-disable no-unreachable */
import axios from "axios";
<<<<<<< HEAD
import { GET_ACCOMMODATIONS, GET_ACCOMMODATION_BY_ID, GET_SERVICES, GET_NEXT_ACCOMMODATIONS, ORDER_BY_RATING, FILTER_BY_PRICE } from "./actions-types";
=======
import { GET_ACCOMMODATIONS, GET_ACCOMMODATION_BY_ID, GET_SERVICES, GET_NEXT_ACCOMMODATIONS, ORDER_BY_RATING, GET_FILTERED_ACCOMMODATION } from "./actions-types";
>>>>>>> dev

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

const getServices = () => {
  const endpoint = `http://localhost:3001/api/services`;
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

const filterByPrice = (minPrice, maxPrice) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_BY_PRICE,
        payload: {minPrice: minPrice, maxPrice: maxPrice}
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
}

<<<<<<< HEAD
=======
const getServices = () => {
  const endpoint = `http://localhost:3001/api/services`;
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
  const {city, country, startDate, endDate, rooms} = values
  const cityName = `city=${city}`
  const countryName = `country=${country}`
  const startDateNum = `startDate=${startDate}`
  const endDateNum = `endDate=${endDate}`
  const roomsNum = `rooms=${rooms}`
  const endpoint = `http://localhost:3001/api/filtered/combinated?${cityName}&${countryName}&${roomsNum}`
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

>>>>>>> dev
export {
  getAccommodations,
  getAccommodationById,
  getServices,
  getNextAccommodations,
<<<<<<< HEAD
  orderByRating,
  filterByPrice
=======
  getFilteredAccommodation,
  orderByRating
>>>>>>> dev
}