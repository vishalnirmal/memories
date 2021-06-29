import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addFilter, resetFilter } from '../../redux/actions/filter';
import './Filter.scss';

function Filter() {
    const {filter} = useSelector(state => state);
    const [value, setValue] = useState(filter.value);
    useEffect(()=>{
        setValue(filter.value);
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
        if (filter.value.trim() !== "")
            dispatch(resetFilter());
    }
    return (
        <div className="filter">
            <div className="filter__input">
                <input type="text" name="value" id="value" value={value} onChange={handleChange} placeholder="Search Memories" autoComplete="off" />
                {
                    value &&
                    <i className="fas fa-times" onClick={clearFilter}></i>
                }
            </div>
            <div className="filter__container">
                <button className="filter__container__title" disabled={!value} onClick={()=>setFilter("title")}>Search Title</button>
                <button className="filter__container__tag" disabled={!value} onClick={()=>setFilter("tags")}>Search Tags</button>
            </div>
        </div>
    )
}

export default Filter
