import React from 'react';
import { useSelector } from 'react-redux';
import AddPostForm from './AddPostForm';

const PostsList = () => {
    const posts = useSelector(state => state.posts);

    const renderedPosts = posts.map(post => (<article className='post-excerpt' key={post.id}><h3>{post.title}</h3><p className='post-content'>{post.content}</p></article>))
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