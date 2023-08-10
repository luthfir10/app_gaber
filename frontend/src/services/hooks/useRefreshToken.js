import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/me`);
    const roles = [response?.data?.role];
    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data.accessToken);
      return {
        ...prev,
        user: response.data.username,
        name: response.data.namauser,
        roles: roles,
        accessToken: response.data.uuid,
      };
    });
    return response.data.uuid;
  };
  return refresh;
};

export default useRefreshToken;
