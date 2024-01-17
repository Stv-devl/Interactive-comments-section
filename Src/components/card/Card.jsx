import { useSelector } from "react-redux";

const Card = () => {
  const comment = useSelector((state) => state.commentReducer);

  return <div></div>;
};

export default Card;
