/* eslint-disable no-case-declarations */
import { GET_ACCOMMODATIONS, GET_ACCOMMODATION_BY_ID, GET_SERVICES, GET_NEXT_ACCOMMODATIONS, ORDER_BY_RATING, FILTER_BY_PRICE } from "./actions/actions-types";

let initialState = {
  accommodations: [],
  allAccommodations: [],
  accommodationById: {},
  accommodationsFiltered: [],
  itemsPerPage: 12,
  services: []
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
    
    case GET_SERVICES:
      return {
        ...state,
        services: payload
      }
    
    case GET_NEXT_ACCOMMODATIONS:
      return {
        ...state,
        accommodations: [...state.accommodationsFiltered].splice(payload*ITEMS_PER_PAGE, ITEMS_PER_PAGE),
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

    case FILTER_BY_PRICE:
      const maxPrice = payload.maxPrice;
      const minPrice = payload.minPrice;
      let filteredByPrice = [];

      if (maxPrice || minPrice) {
        filteredByPrice = [...state.accommodationsFiltered].filter((accommodation) => { 
          return accommodation.price >= minPrice && (maxPrice ? accommodation.price <= maxPrice : true)
        });
      } 
      else {
        return {
          ...state,
          accommodations: [...state.allAccommodations]
        }
      }
      
      return {
        ...state,
        accommodationsFiltered: filteredByPrice,
        accommodations: [...filteredByPrice].splice(0, ITEMS_PER_PAGE)
      }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
