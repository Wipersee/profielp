import CustomerCabinet from "./CustomerCabinet";
import PerformerCabinet from "./PerformerCabinet";
import { useSelector } from "react-redux";

const ProxyCabinet = ({ match }) => {
  const { role } = useSelector((state) => state.userReducer);
  if (role === 'CUST') {
    return <CustomerCabinet match={match} />;
  } else if (role === 'PERF') {
    return <PerformerCabinet match={match} />;
  } else {
    return <h1>Sorry, no role with that id</h1>;
  }
};

export default ProxyCabinet;
