import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments } from "../../actions/comment.action";
import { deleteUserName } from "../../utils/deleteUserName";

const Post = ({ isReplyingTo, commentId }) => {
  const { user } = useSelector((state) => state.userReducer);
  const { comments } = useSelector((state) => state.commentReducer);
  const form = useRef();
  const dispatch = useDispatch();

  const postClass = isReplyingTo === "ramsesmiron" ? "reply-post" : "main-post";

  const handleLastId = () => {
    const getAllIds = (items) =>
      items.flatMap((item) => [
        item.id,
        ...(item.replies ? getAllIds(item.replies) : []),
      ]);
    return Math.max(...getAllIds(comments));
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const userReply = {
      id: String(parseInt(handleLastId(), 10) + 1),
      content: deleteUserName(form.current[0].value, `@${isReplyingTo}`),
      createdAt: "Today",
      score: 0,
      replyingTo: isReplyingTo ? isReplyingTo : null,
      user: {
        image: {
          png: user.image.png,
          webp: user.image.webp,
        },
        username: user.username,
      },
      replies: [],
      userHasLiked: false,
    };

    dispatch(addComment(userReply, commentId));
    dispatch(getComments());
    form.current.reset();
  };

  return (
    <>
      {user && (
        <div className={`${postClass} post-container`}>
          <img
            src={user.image.png}
            alt="icon of user"
            className="user-icone-post"
          />
          <form ref={form} onSubmit={handleForm}>
            <textarea
              placeholder={isReplyingTo ? "" : "Add a comment..."}
              defaultValue={isReplyingTo ? `@${isReplyingTo}` : null}
            ></textarea>

            <input type="submit" value="Send" />
          </form>
        </div>
      )}
    </>
  );
};

export default Post;
