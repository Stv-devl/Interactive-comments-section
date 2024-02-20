import { useDispatch, useSelector } from "react-redux";
import { editComment, getComments } from "../../actions/comment.action";
import Minus from "../icones/Minus";
import Plus from "../icones/Plus";

const Likes = ({ data }) => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleLike = async (increment, e) => {
    const replyTo = data.replyingTo || undefined;
    const userLike = {
      ...data,
      score: data.score + increment,
      userHasLiked: !data.userHasLiked,
    };

    dispatch(editComment(userLike, replyTo));
    dispatch(getComments());
  };

  return (
    <div className="like-container">
      {user && (
        <>
          <div
            className="like-wrapper"
            onClick={(e) => {
              if (!data.userHasLiked && user.username !== data.user.username) {
                handleLike(1, e);
              }
            }}
          >
            <Plus />
          </div>
          <p className="like-number">{data.score}</p>
          <div
            className="like-wrapper"
            onClick={(e) => {
              if (data.userHasLiked && user.username !== data.user.username) {
                handleLike(-1, e);
              }
            }}
          >
            <Minus />
          </div>
        </>
      )}
    </div>
  );
};

export default Likes;
