import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddPostForm from './AddPostForm';
import PostAuthor from '../users/PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButton';

const PostsList = () => {
    const posts = useSelector(state => state.posts);

    const orderdPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderdPosts.map(post => (
        <article className='post-excerpt' key={post.id}>
            <h3>{post.title}</h3>
            <p className='post-content'>{post.content}</p>
            <PostAuthor userId={post.user} />, <TimeAgo timestamp={post.date} />
            <br />
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className='button muted-button'>View Post</Link>
        </article>))
    return (
        <>
            <AddPostForm />
            <section className='posts-list'>
                <h2>Posts</h2>
                {renderedPosts}
            </section>
        </>

    )
}

export default PostsList