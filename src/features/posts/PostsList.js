import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import AddPostForm from "./AddPostForm";
import PostAuthor from "../users/PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButton";
import { useGetPostsQuery } from "../api/apiSlice";
import classnames from "classnames";

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
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery();

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    // sort post in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

  let content;
  if (isLoading) {
    content = <Spinner text="loading..." />;
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
    const containerClassname = classnames("post-container", {
      disabled: isFetching,
    });
    content = <div className={containerClassname}>{renderedPosts}</div>;
  } else if (isError) {
    content = <div>{error}</div>;
  }
  return (
    <>
      <AddPostForm />
      <section className="posts-list">
        <h2>Posts</h2>
        <button onClick={refetch}>Refetch Posts</button>
        {content}
      </section>
    </>
  );
};

export default PostsList;
