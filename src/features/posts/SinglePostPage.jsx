import React from "react";
import { Link, useParams } from "react-router-dom";
import PostAuthor from "../users/PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButton";
import Spinner from "../../components/Spinner";
import { useGetPostQuery } from "../api/apiSlice";

const SinglePostPage = () => {
  const { postId } = useParams();

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId);

  if (isFetching) {
    return <Spinner text="loading" />;
  }

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} /> <TimeAgo timestamp={post.date} />
        <br />
        <ReactionButtons post={post} />
        <Link to={`/posts/edit/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};

export default SinglePostPage;
