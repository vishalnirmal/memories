import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPosts} from '../../redux/actions/post';
import Post from './Post/Post';
import './Posts.scss';

function Posts() {
    const dispatch = useDispatch();
    const {posts, loading, error} = useSelector(state => state.posts);
    useEffect(()=>{
        dispatch(getPosts());
    }, [dispatch]);
    return (
        <div className="posts">
            {
                loading?
                <h4 className="posts__message"><i className="fas fa-spinner posts__message--loading"></i></h4>:
                error?
                <h4 className="posts__message">{error}</h4>:
                (!posts.length)?
                <h4 className="posts__message">No post to show</h4>:
                (
                    posts.map(item=>(
                        <div key={item._id} className="posts__item">
                            <Post post={item}/>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Posts
