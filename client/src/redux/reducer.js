/* eslint-disable no-case-declarations */
import { GET_ACCOMMODATIONS, GET_ACCOMMODATION_BY_ID, GET_FILTERED_ACCOMMODATION, GET_NEXT_ACCOMMODATIONS, GET_SERVICES, ORDER_BY_RATING, CLEAR_DETAIL, GET_COUNTRIES, GET_CITIES, GET_LOCATIONS, LOGIN_USER, LOGIN_GOOGLE, REGISTER_USER, GET_USER_DATA, LOG_OUT, UPDATE_USER_INFO } from "./Actions/actions-types";

let initialState = {
  accommodations: [],
  allAccommodations: [],
  accommodationById: {},
  accommodationsFiltered: [],
  itemsPerPage: 12,
  services: [],
  countries: [],
  cities: [],
  locations: [],
  idUserLogged: "",
  userLogged: {},
  userGoogle: {}
};

const rootReducer = (state = initialState, { type, payload }) => {
  const ITEMS_PER_PAGE = state.itemsPerPage;

  switch (type) {
    case GET_ACCOMMODATIONS:
      return {
        ...state,
        accommodations: [...payload].splice(0, ITEMS_PER_PAGE),
        allAccommodations: payload,
        accommodationsFiltered: payload
      }

    case GET_ACCOMMODATION_BY_ID:
      return {
        ...state,
        accommodationById: payload
      }

    case ORDER_BY_RATING:
      let filteredByOrder = [];
      if (payload === "asc") {
        filteredByOrder = [...state.accommodationsFiltered].sort((a, b) => {
          if (Number(a.rating) < Number(b.rating)) return -1;
          if (Number(a.rating) > Number(b.rating)) return 1;
          return 0;
        });
      } else if (payload === "desc") {
        filteredByOrder = [...state.accommodationsFiltered].sort((a, b) => {
          if (a.rating < b.rating) return 1;
          if (a.rating > b.rating) return -1;
          return 0;
        });
      }
      else {
        return {
          ...state,
          accommodations: [...state.accommodations]
        }
      }

      return {
        ...state,
        accommodationsFiltered: filteredByOrder,
        accommodations: [...filteredByOrder].splice(0, ITEMS_PER_PAGE)
      }

    case GET_NEXT_ACCOMMODATIONS:
      return {
        ...state,
        accommodations: [...state.accommodationsFiltered].splice(payload * ITEMS_PER_PAGE, ITEMS_PER_PAGE),
      }

    case GET_SERVICES:
      return {
        ...state,
        services: payload
      }

    case GET_FILTERED_ACCOMMODATION:
      return {
        ...state,
        accommodationsFiltered: payload,
        accommodations: payload,
      }

    case GET_LOCATIONS:
      const newLocations = [];
      payload.forEach((location) => {
        newLocations.push({value: location});
      })
      return {
        ...state,
        locations: newLocations
      }

    case CLEAR_DETAIL:
      return {
        ...state,
        accommodationById: {},
      }
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload
      }

    case GET_CITIES:
      return {
        ...state,
        cities: payload
      }

    case LOGIN_USER:
      localStorage.setItem("accessToken", payload.accessToken )
      localStorage.setItem("userId", payload.user._id )
      return {
        ...state,
        userLogged: payload.user
      }

    case LOGIN_GOOGLE:
      return {
        ...state,
        userGoogle: payload
      }
    
    case REGISTER_USER:
      localStorage.setItem("accessToken", payload.accessToken )
      localStorage.setItem("userId", payload._id )
      return {
        ...state,
        userLogged: payload,
      }

    case GET_USER_DATA: 
      return {
        ...state,
        userLogged: payload,
      }

    case LOG_OUT: 
      localStorage.clear();
      return {
        ...state,
        idUserLogged: "",
        userLogged: {},
        userGoogle: {}
      }
      
      case UPDATE_USER_INFO:
        return {
          ...state,
          userLogged: {
            ...state.userLogged,
            firstName: payload.firstName,
            lastName: payload.lastName,
          },
        };
    default:
      return {
        ...state,
      };
  }
};



export default rootReducer;