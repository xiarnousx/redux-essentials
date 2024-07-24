import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostAuthor from '../users/PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButton';
import { selectPostById } from './postsSlice';

const SinglePostPage = () => {
    const { postId } = useParams();

    const post = useSelector(state => selectPostById(state, postId));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    return (
        <section>
            <article className='post'>
                <h2>{post.title}</h2>
                <p className='post-content'>{post.content}</p>
                <PostAuthor userId={post.user} /> <TimeAgo timestamp={post.date} />
                <br />
                <ReactionButtons post={post} />
                <Link to={`/posts/edit/${post.id}`} className="button">Edit Post</Link>
            </article>
        </section>
    )
}

export default SinglePostPage