import React, {useState, useEffect} from 'react';
import FileBase from 'react-file-base64';
import Loading from '../Loading/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {addPost, updatePost} from '../../redux/actions/post';
import './Form.scss';

function Form() {
    const dispatch = useDispatch();
    const {post, isBufferLoaded} = useSelector(state=>state.buffer);
    const {user} = useSelector(state=>state.token);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [memory, setMemory] = useState({
        creatorId: user._id,
        creator: user.name,
        title: "",
        message: "",
        tags: "",
        selectedFile: ""
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
    const saveFile = ({base64}) => {
        setMemory({
            ...memory,
                selectedFile: base64
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
        else if (memory.selectedFile === ""){
            setError('Choose an image for the memory');
        }
        else{
            const post = {
                ...memory,
                tags: memory.tags.trim().split(" ")
            }; 
            if (isBufferLoaded){
               dispatch(updatePost(post, setIsLoading, setError)); 
            }
            else{
                dispatch(addPost(post, setIsLoading, setError));
            }
            resetForm();
        }
    }
    const resetForm = ()=>{
        setMemory({
            ...memory,
            title: "",
            message: "",
            tags: "",
            selectedFile: ""
        });
        setError("");
    }
    return (
        <div className="form-container">
            <h2 className="form-container__heading">Creating a Memory</h2>
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
                <FileBase type="file" multiple={false} onDone={saveFile} />
                <button className="form-container__form__button submit" type="submit" disabled={isLoading}>{isLoading?<Loading/>:isBufferLoaded?"Update":"Submit"}</button>
                <button className="form-container__form__button clear" type="button" disabled={isLoading} onClick={resetForm}>{isLoading?<Loading/>:"Clear"}</button>
            </form>
        </div>
    )
}

export default Form