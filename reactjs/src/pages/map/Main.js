import Map from "./components/Map";
import SearchGroup from "./components/SearchGroup";
import AvatarGroup from "./../../common/AvatarGroup";
import { useEffect } from 'react'
import axiosInstance from "../../common/axios";
import userReducer from "../../store/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";


const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance.get("users/me").then(response => {
      dispatch({ type: "SET_USER", payload: response.data }); localStorage.setItem('user', JSON.stringify(response.data));
    }).catch(err => console.log(err))
  }, [])

  return (
    <>
      <SearchGroup />
      <AvatarGroup marginTop="2rem" marginRight="2rem" size={64} />
      <Map />
    </>
  );
};

export default Main;
