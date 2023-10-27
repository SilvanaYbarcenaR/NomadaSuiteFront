/* eslint-disable no-case-declarations */
import { GET_ACCOMMODATIONS, GET_ACCOMMODATION_BY_ID, ORDER_BY_RATING } from "./actions/actions-types";

let initialState = {
  accommodations: [],
  allAccommodations: [],
  accommodationById: {},
  accommodationsFiltered: []
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ACCOMMODATIONS:
      return {
        ...state,
        accommodations: [...payload],
        allAccommodations: payload,
        accommodationsFiltered: payload
      };
    case GET_ACCOMMODATION_BY_ID:
      return {
        ...state,
        accommodationById: payload
      }
      case ORDER_BY_RATING: 
        let filteredByOrder = [];
        if(payload === "asc") {
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
        accommodations: [...filteredByOrder]
      }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
