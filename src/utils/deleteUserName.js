export const deleteUserName = (comment, replyTo) => {
  return comment.startsWith(`${replyTo}`)
    ? comment.slice(replyTo.length + 1)
    : comment;
};
