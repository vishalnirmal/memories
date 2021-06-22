import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addFilter, resetFilter } from '../../redux/actions/filter';
import './Filter.scss';

function Filter() {
    const {filter} = useSelector(state => state.filter);
    const [value, setValue] = useState("");
    useEffect(()=>{
        setValue(filter?filter.value:"");
        return ()=>{
            setValue("");
        }
    }, [filter]);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const setFilter = (type) => {
        dispatch(addFilter({
            type,
            value
        }));
    }
    const clearFilter = () => {
        setValue("");
        dispatch(resetFilter());
    }
    return (
        <div className="filter">
            <div className="filter__input">
                <input type="text" name="value" id="value" value={value} onChange={handleChange} placeholder="Search Memories" />
                {
                    value &&
                    <i className="fas fa-times" onClick={clearFilter}></i>
                }
            </div>
            <div className="filter__container">
                <button className="filter__container__title" onClick={()=>setFilter("title")}>Search Title</button>
                <button className="filter__container__tag" onClick={()=>setFilter("tags")}>Search Tags</button>
            </div>
        </div>
    )
}

export default Filter
