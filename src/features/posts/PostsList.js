import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddPostForm from "./AddPostForm";
import PostAuthor from "../users/PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButton";
import {
  selectAllPosts,
  fetchPosts,
  selectPostIds,
  selectPostById,
} from "./postsSlice";
import { useGetPostsQuery } from "../api/apiSlice";

import Spinner from "../../components/Spinner";

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  let content;
  if (isLoading) {
    content = <Spinner text="loading..." />;
  } else if (isSuccess) {
    content = posts.map((post) => <PostExcerpt key={post.id} post={post} />);
  } else if (isError) {
    content = <div>{error}</div>;
  }
  return (
    <>
      <AddPostForm />
      <section className="posts-list">
        <h2>Posts</h2>
        {content}
      </section>
    </>
  );
};

export default PostsList;
