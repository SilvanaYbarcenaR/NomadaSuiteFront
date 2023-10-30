/* eslint-disable no-unreachable */
import axios from "axios";
import { GET_ACCOMMODATIONS, GET_ACCOMMODATION_BY_ID, GET_SERVICES, GET_NEXT_ACCOMMODATIONS, ORDER_BY_RATING, GET_LOCATION_BY_NAME } from "./actions-types";

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

const getLocationByName = (name) => {
  const endpoint = `http://localhost:3001/location?name=${name}`
  try {
    return async (dispatch) => {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_LOCATION_BY_NAME,
        payload: data
      })
    }
  } catch (error) {
    console.log(error.response.data.error);
  }
}

export {
  getAccommodations,
  getAccommodationById,
  getServices,
  getNextAccommodations,
  getLocationByName,
  orderByRating
}