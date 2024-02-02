const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use("/searchById/:id", (req, res, next) => {
  const id = req.params.id;
  const db = router.db;
  let result = null;

  if (req.method === "GET") {
    const comment = db.get("comments").find({ id }).value();
    if (comment) {
      result = comment;
    } else {
      db.get("comments")
        .value()
        .some((comment) => {
          const reply = comment.replies.find((r) => r.id === id);
          if (reply) {
            result = reply;
            return true;
          }
          return false;
        });
    }

    if (result) {
      res.json(result);
    } else {
      res
        .status(404)
        .json({ message: "No comment or reply found with this ID." });
    }
  } else if (req.method === "PUT") {
    const newData = req.body;
    let updated = false;

    const comments = db.get("comments");
    comments.value().forEach((comment) => {
      if (comment.id === id) {
        comments.find({ id }).assign(newData).write();
        result = comments.find({ id }).value();
        updated = true;
        return false;
      }

      const replyIndex = comment.replies.findIndex((r) => r.id === id);
      if (replyIndex !== -1) {
        comment.replies[replyIndex] = {
          ...comment.replies[replyIndex],
          ...newData,
        };
        comments
          .find({ id: comment.id })
          .assign({ replies: comment.replies })
          .write();
        result = comment.replies[replyIndex];
        updated = true;
        return false;
      }
    });

    if (updated) {
      res.json(result);
    } else {
      res
        .status(404)
        .json({ message: "No comment or reply found with this ID." });
    }
  } else {
    next();
  }
});

server.delete("/searchById/:id", (req, res) => {
  const id = req.params.id;
  const db = router.db;
  let isDeleted = false;

  const comments = db.get("comments");
  const comment = comments.find({ id }).value();

  if (comment) {
    comments.remove({ id }).write();
    isDeleted = true;
  } else {
    comments.value().some((comment) => {
      const replyIndex = comment.replies.findIndex((r) => r.id === id);
      if (replyIndex !== -1) {
        comment.replies.splice(replyIndex, 1);
        comments
          .find({ id: comment.id })
          .assign({ replies: comment.replies })
          .write();
        isDeleted = true;
        return true;
      }
      return false;
    });
  }

  if (isDeleted) {
    res.json({ message: "Commentaire ou réponse supprimé avec succès." });
  } else {
    res
      .status(404)
      .json({ message: "Aucun commentaire ou réponse trouvé avec cet ID." });
  }
});

server.get("/comments/:id/replies", (req, res) => {
  const id = req.params.id;
  const db = router.db;
  const comment = db.get("comments").find({ id }).value();

  if (comment && comment.replies) {
    res.json(comment.replies);
  } else {
    res
      .status(404)
      .json({ message: `No replies found for comment with ID: ${id}.` });
  }
});

server.post("/comments/:id/replies", (req, res) => {
  const id = req.params.id;
  const newReply = req.body;
  const db = router.db;

  const comment = db.get("comments").find({ id }).value();

  if (comment) {
    if (!comment.replies) {
      comment.replies = [];
    }
    comment.replies.push(newReply);

    db.get("comments")
      .find({ id })
      .assign({ replies: comment.replies })
      .write();

    res.status(201).json(newReply);
  } else {
    res.status(404).json({ message: `Comment with ID: ${id} not found.` });
  }
});

server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
