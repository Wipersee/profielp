import CustomerCabinet from "./CustomerCabinet";
import PerformerCabinet from "./PerformerCabinet";

const ProxyCabinet = ({ match }) => {
  const role = 2; //TODO: when API will be done rewrite to getting this from localStorage
  if (role === 1) {
    return <CustomerCabinet match={match} />;
  } else if (role === 2) {
    return <PerformerCabinet match={match} />;
  } else {
    return <h1>Sorry, no role with that id</h1>;
  }
};

export default ProxyCabinet;
