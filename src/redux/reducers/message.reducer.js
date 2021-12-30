import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {};

export default function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      // console.log("ZET MESSAGE")
      // console.log(payload)

      return { message: payload.message };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}
