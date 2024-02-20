import { useState } from "react";
import { deleteUserName } from "../../utils/deleteUserName";

const Edit = ({ onSave, defaultValue, replyTo }) => {
  const [editedComment, setEditedComment] = useState(
    `${replyTo ? replyTo : ""} ${defaultValue}`
  );

  const handleChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(deleteUserName(editedComment, replyTo));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          className="editingTextArea"
          autoFocus={true}
          value={editedComment}
          onChange={handleChange}
        />

        <input type="submit" value="update" className="updateBtn" />
      </form>
    </>
  );
};

export default Edit;
