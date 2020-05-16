import React, { useState, useEffect } from "react";
import axios from "axios";

function CommentList({ id }) {
  const [comments, setComments] = useState([]);

  const getComments = () => {
    axios.get(`http://localhost:7000/posts/${id}/comments`).then(res => {
      setComments(res.data);
    });
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderComments = comments.map(comment => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderComments}</ul>;
}

export default CommentList;
