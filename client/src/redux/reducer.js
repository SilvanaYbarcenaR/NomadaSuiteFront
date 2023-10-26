import { GET_ACCOMMODATIONS } from "./actions/actions-types";

let initialState = {
  accommodations: [],
  allAccommodations: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ACCOMMODATIONS:
      return {
        ...state,
        pokemons: [...payload],
        allAccommodations: payload
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
