import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faReply, faTrash } from "@fortawesome/free-solid-svg-icons";

const ActionButtons = ({
  isCurrentUser,
  handleDelete,
  handleToggleEdit,
  handleToggleReply,
}) => {
  const actionClass = isCurrentUser ? "user-action" : "main-action";

  return (
    <div className={`${actionClass} action-container`}>
      {isCurrentUser && (
        <div className="delete-wrapper" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} className="icon-delete" />
          <p className="delete">Delete</p>
        </div>
      )}
      <div
        className="reply-wrapper"
        onClick={isCurrentUser ? handleToggleEdit : handleToggleReply}
      >
        {isCurrentUser ? (
          <FontAwesomeIcon icon={faPen} className="icon-edit" />
        ) : (
          <FontAwesomeIcon icon={faReply} className="icon-reply" />
        )}
        <p className="reply">{isCurrentUser ? "Edit" : "Reply"}</p>
      </div>
    </div>
  );
};

export default ActionButtons;
