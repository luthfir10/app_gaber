import axios from "axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/logout`
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return logout;
};

export default useLogout;
