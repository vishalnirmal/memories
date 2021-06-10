import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPosts} from '../../redux/actions/post';
import Loading from '../Loading/Loading';
import Post from './Post/Post';
import './Posts.scss';

function Posts() {
    const dispatch = useDispatch();
    const {posts, loading, error} = useSelector(state => state.posts);
    const {user} = useSelector(state => state.token);
    useEffect(()=>{
        dispatch(getPosts());
    }, [dispatch]);
    return (
        <div className="posts">
            {
                loading?
                <h4 className="posts__message"><Loading size={"4rem"}/></h4>:
                error?
                <h4 className="posts__message">{error}</h4>:
                (!posts.length)?
                <h4 className="posts__message">No post to show</h4>:
                (
                    posts.map(item=>(
                        <div key={item._id} className="posts__item">
                            <Post post={item} isAuthor={user && user._id === item.creatorId}/>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Posts
