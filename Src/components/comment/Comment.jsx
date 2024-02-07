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
import Edit from "../edit/Edit";
import Content from "../content/Content";

const Comment = ({ data, isReply }) => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isCurrentUser = data && user && data.user.username === user.username;
  const replyTo = data.replyingTo || undefined;
  const getReplyUserName = replyTo && `@${replyTo}`;

  const updatedComment = useCallback(
    (newComment) => {
      const updatedComment = { ...data, content: newComment };

      dispatch(editComment(updatedComment, replyTo));
      dispatch(getComments());
      setIsEditing(false);
    },
    [dispatch, data, replyTo]
  );

  return (
    <>
      <div
        className={
          isReply
            ? "reply-comment comment-wrapper"
            : "main-comment comment-wrapper"
        }
      >
        <Likes data={data} key={`like-${data.id}`} />

        <div className="card-wrapper">
          <Profil
            user={data.user}
            createdAt={data.createdAt}
            isCurrentUser={isCurrentUser}
          />
          {isEditing ? (
            <Edit
              defaultValue={`${getReplyUserName} ${data.content}`}
              onSave={updatedComment}
            />
          ) : (
            <Content content={data.content} replyTo={getReplyUserName} />
          )}
        </div>
        <ActionButtons
          isCurrentUser={isCurrentUser}
          setIsModalOpen={setIsModalOpen}
          handleToggleEdit={() => setIsEditing(!isEditing)}
          handleToggleReply={() => setShowReply(!showReply)}
        />
      </div>
      {showReply && !isCurrentUser && (
        <Post isReplyingTo={data.user.username} commentId={data.id} />
      )}
      {isModalOpen && (
        <Modale
          closeModale={() => setIsModalOpen(false)}
          deleteComment={() => dispatch(deleteComment(data.id))}
        />
      )}
    </>
  );
};

export default Comment;
