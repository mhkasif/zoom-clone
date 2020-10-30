import React from "react";
export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        user: action.user || "user",
      };

    default:
      return state;
  }
};

export default reducer;