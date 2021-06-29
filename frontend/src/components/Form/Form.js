import React, {useState, useEffect} from 'react';
import FileBase from 'react-file-base64';
import Loading from '../Loading/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {addPost, updatePost} from '../../redux/actions/post';
import {emptyUpdateBuffer} from '../../redux/actions/buffer';
import './Form.scss';

const getImageDimension = (base64, setDimensions) => {
    const image = new Image();
    image.src = base64;
    image.onload = () => {
        setDimensions({
            width: image.naturalWidth,
            height: image.naturalHeight
        });
    }
}

function Form() {
    const dispatch = useDispatch();
    const {post, isBufferLoaded} = useSelector(state=>state.buffer);
    const {user, token} = useSelector(state=>state.token);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [memory, setMemory] = useState({
        creator: user._id,
        title: "",
        message: "",
        tags: "",
        selectedFile: {
            image: ""
        }
    });
    useEffect(() => {
        if (post){
            setMemory({
                ...post,
                tags: post.tags.join(" ")
            });
        }
    }, [post]);
    const handleChange = (e) => {
        setMemory({
            ...memory,
            [e.target.name]: e.target.value
        });
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    }
    const saveFile = ({base64}) => {
        getImageDimension(base64, (data)=>{
            setMemory({
                ...memory,
                selectedFile: {
                    dimensions: data,
                    image: base64
                }
            });
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!memory.title){
            setError('Title field cannot be empty');
        }
        else if (!memory.message){
            setError('Message field cannot be empty');
        }
        else if (memory.tags.trim() === ""){
            setError('Tags field cannot be empty');
        }
        else if (memory.selectedFile.image === ""){
            setError('Choose an image for the memory');
        }
        else{
            const post = {
                ...memory,
                tags: memory.tags.trim().split(" ")
            };
            const submit = isBufferLoaded?updatePost:addPost;
            dispatch(submit(post, setIsLoading, setError, resetForm, token, scrollToTop));
        }
    }
    const resetMemory = () => {
        var newMemory = {
            ...memory,
            title: "",
            message: "",
            tags: "",
            selectedFile: {
                image: ""
            }
        };
        delete newMemory['_id'];
        setMemory(newMemory);
    }
    const resetForm = ()=>{
        resetMemory();
        setError("");
        dispatch(emptyUpdateBuffer());
    }
    return (
        <div className="form-container">
            <h2 className="form-container__heading">{isBufferLoaded?"Update Memory":"Creating a Memory"}</h2>
            {
                error?
                <p className="form-container__error">{error}</p>:
                ""
            }
            <form className="form-container__form" onSubmit={handleSubmit}>
                <input type="text" name="title" id="title" label="title" placeholder="Title" className="form-container__form__input" value={memory.title} onChange={handleChange} autoComplete="off"/>
                <textarea name="message" id="message" label="message" placeholder="Message" rows={5} cols={10} className="form-container__form__input" value={memory.message} onChange={handleChange}/>
                <div className="form-container__form__tags">
                    <input type="text" name="tags" id="tags" label="tags" placeholder="Tags" className="form-container__form__input" value={memory.tags} onChange={handleChange} autoComplete="off"/>
                    <p className="form-container__form__tags__paragraph">{
                        memory.tags.trim() === ""?
                        <span className="form-container__form__tags__paragraph__message">Tags should be seperated by spaces</span>:
                        memory.tags.split(" ").map((tag, index)=>{
                            if (tag === "")
                                return ""
                            return <span className="form-container__form__tags__paragraph__tag" key={index}>{tag}</span>
                        })
                    }</p>
                </div>
                {
                    !isBufferLoaded && <FileBase type="file" multiple={false} onDone={saveFile} />
                }
                <button className="form-container__form__button submit" type="submit" disabled={isLoading}>{isLoading?<Loading/>:isBufferLoaded?"Update":"Submit"}</button>
                <button className="form-container__form__button clear" type="button" disabled={isLoading} onClick={resetForm}>Clear</button>
            </form>
        </div>
    )
}

export default Form