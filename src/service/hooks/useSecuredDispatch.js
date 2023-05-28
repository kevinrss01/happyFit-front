import { useDispatch } from "react-redux";
import { assessTokenValidity } from "../utils";

export const useSecuredDispatch = () => {
  const dispatch = useDispatch();

  return (actionObject) => {
    const tokenStatus = assessTokenValidity();
    if (tokenStatus) {
      if (tokenStatus.refresh) {
        dispatch(refreshToken(tokenStatus.token)).then(() => {
          dispatch(actionObject);
        });
      } else {
        dispatch(actionObject);
      }
    }
  };
};
