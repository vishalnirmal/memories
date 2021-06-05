import React from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../redux/actions/post';
import {fillUpdateBuffer} from '../../../redux/actions/buffer';
import './Post.scss';

function Post({post}) {
    const dispatch = useDispatch();
    const deleteMemory = () => {
        dispatch(deletePost(post._id));
    }
    const likeMemory = () => {
        dispatch(likePost(post._id));
    }
    const updateMemory = () => {
        dispatch(fillUpdateBuffer(post));
    }
    return (
        <div className="card">
            <div className="card__top-section">
                <img className="card__top-section__media" src={post.selectedFile} alt={post.title} />
                <div className="card__top-section__details">
                    <div className="card__top-section__details__info">
                        <p className="card__top-section__details__info__creator">{post.creator}</p>
                        <p className="card__top-section__details__info__time">{moment(post.createdAt).from(moment(new Date()))}</p>
                    </div>
                    <div className="card__top-section__details__edit">
                        <i className="far fa-edit" onClick={updateMemory}></i>
                    </div>
                </div>
            </div>
            <div className="card__bottom-section">
                <div className="card__bottom-section__details">
                    <div className="card__bottom-section__details__tags">
                        {
                            post.tags.map(tag=>(<p className="card__bottom-section__details__tags__item">{tag}</p>))
                        }
                    </div>
                    <h2 className="card__bottom-section__details__title">{post.title}</h2>
                    <p className="card__bottom-section__details__message">{post.message}</p>
                </div>
                <div className="card__bottom-section__ctas">
                    <p className="card__bottom-section__ctas__like">
                        <i className="far fa-heart" onClick={likeMemory}></i>
                        <span>{post.likes?post.likes:""}</span>
                    </p>
                    <p className="card__bottom-section__ctas__like">
                        <i className="fas fa-trash" onClick={deleteMemory}></i>
                    </p>
                </div>
            </div>
        </div>
    )
}

Post.defaultProps = {
    post: {
        title: "Hello world",
        creator: "Vishal Nirmal",
        message: "skjn lksdn lkdsn lkns lksnlkns dlkn s",
        tags: ["1", "2", "3"],
        createdAt: new Date(0),
        selectedFile: "/background.jpg"
    }
}

export default Post
