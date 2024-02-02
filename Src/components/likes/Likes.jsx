import { useDispatch, useSelector } from "react-redux";
import { editComment, getComments } from "../../actions/comment.action";

const Likes = ({ data }) => {
  const { user } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const handleLike = async (increment, e) => {
    e.preventDefault();

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
    <>
      {user && (
        <>
          <svg
            className="like-icone"
            onClick={(e) => {
              if (!data.userHasLiked && user.username !== data.user.username) {
                handleLike(1, e);
              }
            }}
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.33019 10.896C6.46675 10.896 6.58469 10.8463 6.68401 10.747C6.78333 10.6477 6.83299 10.5298 6.83299 10.3932V7.004H10.1477C10.2843 7.004 10.4022 6.95434 10.5015 6.85503C10.6008 6.75571 10.6505 6.63777 10.6505 6.50121V5.27216C10.6505 5.1356 10.6008 5.01766 10.5015 4.91834C10.4022 4.81903 10.2843 4.76937 10.1477 4.76937H6.83299V1.39879C6.83299 1.26223 6.78333 1.14429 6.68401 1.04497C6.58469 0.945655 6.46675 0.895996 6.33019 0.895996H4.91492C4.77836 0.895996 4.66042 0.945655 4.56111 1.04497C4.46179 1.14429 4.41213 1.26223 4.41213 1.39879V4.76937H1.0788C0.942236 4.76937 0.824297 4.81903 0.72498 4.91834C0.625663 5.01766 0.576004 5.1356 0.576004 5.27216V6.50121C0.576004 6.63777 0.625663 6.75571 0.72498 6.85503C0.824297 6.95434 0.942236 7.004 1.0788 7.004H4.41213V10.3932C4.41213 10.5298 4.46179 10.6477 4.56111 10.747C4.66042 10.8463 4.77836 10.896 4.91492 10.896H6.33019Z"
              fill="#C5C6EF"
            />
          </svg>
          <p className="like-number">{data.score}</p>
          <svg
            className="like-icone"
            onClick={(e) => {
              if (data.userHasLiked && user.username !== data.user.username) {
                handleLike(-1, e);
              }
            }}
            width="10"
            height="3"
            viewBox="0 0 10 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.25591 2.66C9.46018 2.66 9.63659 2.60445 9.78515 2.49334C9.93371 2.38223 10.008 2.25028 10.008 2.0975V0.722504C10.008 0.569726 9.93371 0.437781 9.78515 0.32667C9.63659 0.215559 9.46018 0.160004 9.25591 0.160004H0.760085C0.555814 0.160004 0.379398 0.215559 0.230837 0.32667C0.082276 0.437781 0.00799561 0.569726 0.00799561 0.722504V2.0975C0.00799561 2.25028 0.082276 2.38223 0.230837 2.49334C0.379398 2.60445 0.555814 2.66 0.760085 2.66H9.25591Z"
              fill="#C5C6EF"
            />
          </svg>
        </>
      )}
    </>
  );
};

export default Likes;
