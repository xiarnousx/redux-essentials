import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';
import { nanoid } from '@reduxjs/toolkit';

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    const onSavePostClicked = () => {
        if (!title || !content) return;
        dispatch(postAdded(title, content, userId));
        setTitle('');
        setContent('');
        setUserId('');
    }

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    const usersOption = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))

    return (
        <section>
            <h2>Add a new Post</h2>
            <form>
                <label htmlFor='postTitle'>Post Title:</label>
                <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
                <label htmlFor='postContent'>Post Content:</label>
                <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
                <label htmlFor='postAuthor'>Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value="" disabled>Select Author</option>
                    {usersOption}
                </select>
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
            </form>
        </section>
    );
}

export default AddPostForm