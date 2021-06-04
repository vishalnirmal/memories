import React from 'react';
import moment from 'moment';
import './Post.scss';

function Post({post}) {
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
                        <i className="far fa-edit"></i>
                    </div>
                </div>
            </div>
            <div className="card__bottom-section">
                <div className="card__bottom-section__details">
                    <p className="card__bottom-section__details__tags">{post.tags}</p>
                    <h2 className="car__bottom-section__details__title">{post.title}</h2>
                    <p className="card__bottom-section__details__message">{post.message}</p>
                </div>
                <div className="card__bottom-section__ctas">
                    <p className="card__bottom-section__ctas__like">
                        <i className="far fa-heart"></i>
                    </p>
                    <p className="card__bottom-section__ctas__like">
                        <i className="fas fa-trash" onClick={()=>{}}></i>
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
