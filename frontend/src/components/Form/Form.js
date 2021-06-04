import React, {useState} from 'react';
import FileBase from 'react-file-base64';
import './Form.scss';

function Form() {
    const error = "";
    const loading = false;
    const [memory, setMemory] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: ""
    });
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
        if (!memory.creator){
            // dispatch(displayError('Creator field cannot be empty'));
        }
        else if (!memory.title){
            // dispatch(displayError('Title field cannot be empty'));
        }
        else if (!memory.message){
            // dispatch(displayError('Message field cannot be empty'));
        }
        else if (!memory.tags){
            // dispatch(displayError('Tags field cannot be empty'));
        }
        else{
            // dispatch(createPost(memory));
            console.log({
                ...memory,
                tags: memory.tags.trim().split(" ")
            });
            resetForm();
        }
    }
    const resetForm = ()=>{
        setMemory({
            creator: "",
            title: "",
            message: "",
            tags: "",
            selectedFile: ""
        });
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
                <input type="text" name="creator" id="creator" label="creator" placeholder="Creator" className="form-container__form__input" value={memory.creator} onChange={handleChange} autoComplete="off"/>
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
                <button className="form-container__form__button submit" type="submit" disabled={loading?true:false}>{loading?"Loading":"Submit"}</button>
                <button className="form-container__form__button clear" type="button" disabled={loading?true:false} onClick={resetForm}>{loading?"Loading":"Clear"}</button>
            </form>
        </div>
    )
}

export default Form