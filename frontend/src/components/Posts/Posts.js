import React, {useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actionTypes from '../../redux/constants/filter';
import Loading from '../Loading/Loading';
import Post from './Post/Post';
import './Posts.scss';

function Posts() {
    const {posts, loading, error, hasMore} = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const observer = useRef();
    const lastRef = useCallback(node => {
        if (loading) return;
        if (observer.current){
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore){
                dispatch({
                    type: actionTypes.NEXT_PAGE
                });
            }
        });
        if (node) observer.current.observe(node);
    }, [dispatch, loading, hasMore]);
    return (
        <div className="posts">
            {
                error?
                <h4 className="posts__message">{error}</h4>:
                (!posts.length && !loading)?
                <h4 className="posts__message">No post to show</h4>:
                (
                    posts.map((item, index)=>{
                        if (index === posts.length - 1)
                            return (
                                <div ref={lastRef} key={item._id} className="posts__item">
                                    <Post post={item}/>
                                </div>
                            );
                        return (
                            <div key={item._id} className="posts__item">
                                <Post post={item}/>
                            </div>
                        );
                    })
                )
            }
            {
                loading && <h4 className="posts__message"><Loading size={"4rem"}/></h4>
            }
            {
                hasMore === false && <h4 className="posts__message">You are all caught up.</h4>
            }
        </div>
    )
}

export default Posts
