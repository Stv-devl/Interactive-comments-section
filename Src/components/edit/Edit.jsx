import React, { useState } from "react";

const Edit = ({ onSave, defaultValue }) => {
  const [editedComment, setEditedComment] = useState(defaultValue);

  return (
    <>
      <form onSubmit={() => onSave(editedComment)}>
        <textarea
          className="editingTextArea"
          autoFocus={true}
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        ></textarea>
        <input type="submit" value="update" className="updateBtn" />
      </form>
    </>
  );
};

export default Edit;
