import Map from "./components/Map";
import SearchGroup from "./components/SearchGroup";
import AvatarGroup from "./../../common/AvatarGroup";

const Main = () => {
  return (
    <>
      <SearchGroup />
      <AvatarGroup marginTop="2rem" marginRight="2rem" size={64} />
      <Map />
    </>
  );
};

export default Main;
