import React, { useCallback, useState } from "react";
import Likes from "../likes/Likes";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  editComment,
  getComments,
} from "../../actions/comment.action";
import Profil from "../profil/Profil";
import ActionButtons from "../actionBtn/ActionBtn";
import Modale from "../modale/Modale";

const Comment = ({ data, isReply }) => {
  const { user } = useSelector((state) => state.userReducer);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(data.content);

  const dispatch = useDispatch();

  const commentClass = isReply ? "reply-comment" : "main-comment";
  const isCurrentUser = data && user && data.user.username === user.username;
  const replyTo = data.replyingTo || undefined;
  const getReplyUserName = replyTo && `@${replyTo}`;

  const closeModale = () => {
    setIsModalOpen(false);
  };

  const toggleEdit = useCallback(() => setIsEditing(!isEditing), [isEditing]);
  const toggleReply = useCallback(() => setShowReply(!showReply), [showReply]);

  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();

      const updatedComment = { ...data, content: editedComment };

      dispatch(editComment(updatedComment, replyTo));
      dispatch(getComments());
      setIsEditing(false);
    },
    [dispatch, data, replyTo, editedComment]
  );

  return (
    <>
      <div className={`${commentClass} comment-wrapper`}>
        <div className="like-container">
          <Likes data={data} key={`like-${data.id}`} />
        </div>
        <div className="card-wrapper">
          <Profil
            user={data.user}
            createdAt={data.createdAt}
            isCurrentUser={isCurrentUser}
          />
          {isEditing ? (
            <form onSubmit={(e) => handleUpdate(e)}>
              <textarea
                className="editingTextArea"
                autoFocus={true}
                defaultValue={`${getReplyUserName && getReplyUserName} ${
                  data.content
                }`}
                onChange={(e) => setEditedComment(e.target.value)}
              ></textarea>
              <input type="submit" value="update" className="updateBtn" />
            </form>
          ) : (
            <p className="comment">
              <span className="answerTo">
                {getReplyUserName && getReplyUserName}{" "}
              </span>
              {data.content}
            </p>
          )}
        </div>
        <ActionButtons
          isCurrentUser={isCurrentUser}
          setIsModalOpen={setIsModalOpen}
          handleToggleEdit={toggleEdit}
          handleToggleReply={toggleReply}
        />
      </div>
      {showReply && !isCurrentUser && (
        <div className="reply-container">
          <Post isReplyingTo={data.user.username} commentId={data.id} />
        </div>
      )}
      <div>
        <Modale
          modaleIsOpen={isModalOpen}
          closeModale={closeModale}
          handleDelete={() => dispatch(deleteComment(data.id))}
        />
      </div>
    </>
  );
};

export default Comment;
