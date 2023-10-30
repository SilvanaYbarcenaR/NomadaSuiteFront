/* eslint-disable no-case-declarations */
import { GET_ACCOMMODATIONS, GET_ACCOMMODATION_BY_ID, GET_FILTERED_ACCOMMODATION, GET_NEXT_ACCOMMODATIONS, GET_SERVICES, ORDER_BY_RATING, CLEAR_DETAIL } from "./actions/actions-types";

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
        accommodations: [...state.accommodationsFiltered].splice(payload*ITEMS_PER_PAGE, ITEMS_PER_PAGE),
      }
    case GET_SERVICES:
      return {
        ...state,
        services: payload
      }
    case GET_FILTERED_ACCOMMODATION:
      return{
        ...state,
        accommodations: payload
      }
    case CLEAR_DETAIL:
      return {
        ...state,
        accommodationById: {},
      }
      
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
