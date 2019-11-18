import { UserActionTypes } from "./user.types";

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

/*리듀서에서 받아야 하는 타입으로 설정하는겨 */
