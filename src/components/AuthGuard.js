import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { tokenIsValid } from "../service/utils";
import { refreshToken } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import Axios from "../service/axios";
import { getUserInfo } from "../redux/actions/userActions";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRefreshToken = useCallback(
    (status) => {
      if (status.refresh) {
        dispatch(refreshToken(status.token));
      } else {
        const { sub: userId } = jwtDecode(status.token);
        Axios.saveToken(status.token);
        dispatch(getUserInfo(userId));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const validStatus = tokenIsValid();
    if (!validStatus) router.push("/connexion");
    else handleRefreshToken(validStatus);
  }, []);

  return <>{children}</>;
}
