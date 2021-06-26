import React, { useRef } from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {deletePost, likePost} from '../../../redux/actions/post';
import {fillUpdateBuffer} from '../../../redux/actions/buffer';
import {addFilter} from '../../../redux/actions/filter';
import Loading from '../../Loading/Loading';
import useLoadImage from './loadImage';
import './Post.scss';
import bufferImage from '../../../images/bufferImage2.gif';

const getContainerStyling = (width, height) => {
    return {
        paddingBottom: `${Math.min(height / width * 100, 100)}%`
    }
}

function Post({post}) {
    const dispatch = useDispatch();
    const cardRef = useRef();
    const {user, token} = useSelector(state=>state.token);
    const {loading, imageData} = useLoadImage(post.selectedFile.image);
    // Checking if the post is created by the logged in user 
    const isAuthor = user && user._id === post.creatorId;
    
    const deleteMemory = () => {
        cardRef.current.classList.add("disable");
        if (token){
            dispatch(deletePost(post._id, token));
        }
    }
    const likeMemory = () => {
        if (token && user){
            dispatch(likePost(post._id, user._id, token));
        }
    }
    const updateMemory = () => {
        dispatch(fillUpdateBuffer(post));
    }
    const tagSelected = (tag) => {
        window.scrollTo({
            top: 0, 
            behavior: 'auto'
        });
        dispatch(addFilter({
            type: "tags",
            value: tag
        }));
    }
    return (
        <div className="card" ref={cardRef}>
            <figure className="card__load">
                <Loading size={"4em"}/>
            </figure>
            <div className="card__top-section">
                <div className="card__top-section__container" style={getContainerStyling(post.selectedFile.dimensions.width, post.selectedFile.dimensions.height)}>
                    <img src={loading?bufferImage:imageData.data} alt={post.title}/>
                </div>
                <div className="card__top-section__details">
                    <div className="card__top-section__details__info">
                        <p className="card__top-section__details__info__creator">{post.creator}</p>
                        <p className="card__top-section__details__info__time">{moment(post.createdAt).from(moment(new Date()))}</p>
                    </div>
                    {
                        isAuthor && 
                        <div className="card__top-section__details__edit">
                            <i className="far fa-edit" title="Edit Memory" onClick={updateMemory}></i>
                        </div>
                    }
                </div>
            </div>
            <div className="card__bottom-section">
                <div className="card__bottom-section__details">
                    <div className="card__bottom-section__details__tags">
                        {
                            post.tags.map((tag, index)=>(<p key={index} title={tag} onClick={()=>tagSelected(tag)} className="card__bottom-section__details__tags__item">{tag}</p>))
                        }
                    </div>
                    <h2 className="card__bottom-section__details__title">{post.title}</h2>
                    <div className="card__bottom-section__details__message">
                        {
                            post.message.split("\n").map((para, index)=>(
                                <p key={index}>{para}</p>
                            ))
                        }
                    </div>
                </div>
                <div className="card__bottom-section__ctas">
                    <p className="card__bottom-section__ctas__like">
                        <i className={((user && post.likes.indexOf(user._id)>-1)?"fas":"far")+" fa-heart"} onClick={likeMemory}></i>
                        <span>{post.likes.length?post.likes.length:""}</span>
                    </p>
                    {
                        isAuthor &&
                        <p className="card__bottom-section__ctas__delete">
                            <i className="fas fa-trash" onClick={deleteMemory}></i>
                        </p>
                    }
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
