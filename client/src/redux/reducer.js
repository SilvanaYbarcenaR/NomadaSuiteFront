import { GET_ACCOMMODATIONS, GET_ACCOMMODATION_BY_ID } from "./actions/actions-types";

let initialState = {
  accommodations: [],
  allAccommodations: [],
  accommodationById: {}
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ACCOMMODATIONS:
      return {
        ...state,
        pokemons: [...payload],
        allAccommodations: payload
      };
    case GET_ACCOMMODATION_BY_ID:
      return {
        ...state,
        accommodationById: payload
      }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
