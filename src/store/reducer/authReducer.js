import * as actionTypes from "../action/actionTypes";
import { updatedObject } from "../../Shared/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authNavigateToPath: "/",
};

const authStart = (state, action) => {
  return updatedObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updatedObject(state, {
    token: action.token,
    userId: action.userId,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updatedObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
  return updatedObject(state, { token: null, userId: null });
};

const setAuthNavigateToPath = (state, action) => {
  return updatedObject(state, { authNavigateToPath: action.path });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_NAVIGATE_PATH:
      return setAuthNavigateToPath(state, action);
    default:
      return state;
  }
};
export default reducer;
