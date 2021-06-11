import React from 'react';
import {useSelector} from 'react-redux';
import Loading from '../Loading/Loading';
import Post from './Post/Post';
import './Posts.scss';

function Posts() {
    const {posts, loading, error} = useSelector(state => state.posts);
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
                            <Post post={item}/>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Posts
