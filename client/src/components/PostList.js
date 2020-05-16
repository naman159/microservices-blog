import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function PostList() {
  const [posts, setPosts] = useState({});

  const getPosts = () => {
    axios.get("http://localhost:5000/posts").then(res => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderPosts = Object.values(posts).map(post => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList id={post.id} />
          <CommentCreate id={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts}
    </div>
  );
}

export default PostList;
