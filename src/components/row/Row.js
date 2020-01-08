import React, { useState, useRef, useEffect } from 'react';
import './Row.css';
import Input from '../input/Input';
import visualiseImage from '../../assets/images/remove_red_eye-24px.svg';

function Row({label, values, initialValues, valueIndex, columns, onChange, onLabelChange}) {

    const [editLabel, setEditLabel] = useState(!label);
    const [editedLabel, setEditedLabel] = useState(label);
    const labelInput = useRef();

    useEffect(() => {
        if(!label && !editedLabel && labelInput.current){
            labelInput.current.focus();
        }
    })

    const inputs = columns.map((c,index) => {
        let isSame = false;
        if(values.filter((val) => values[index] == val).length >= 2) isSame = true;
        const value = typeof values[index] == 'string' ? values[index] : JSON.stringify(values[index]);
        const initialValue = typeof initialValues[index] == 'string' ? initialValues[index] : JSON.stringify(initialValues[index]);
        return (<div className="row__inputs__input" key={c}><Input value={value} initialValue={initialValue} valueIndex={valueIndex} index={index} onChange={onChange} duplicate={isSame} /></div>)
    })

    return (
        <div className="row">
            <div className="row__label">
                {   
                    editLabel ?
                    <input value={editedLabel} ref={labelInput} onChange={(e) => {
                        setEditedLabel(e.target.value);
                    }}/>:
                    <label>{label}</label>
                }

                <div className="row__label__actions">
                    <img alt="visualise" src={visualiseImage} onClick={() => {
                        setEditLabel(!editLabel);
                        if (editLabel && editedLabel !== label) {
                            onLabelChange(valueIndex,editedLabel);
                        }
                    }} />
                </div>
            </div>
            <div className="row__inputs">
                {inputs}
            </div>
        </div>
    );
}

function areEqual(prevProps, nextProps) {
    return !nextProps.values.filter((v, index) => prevProps.values[index] !== v || nextProps.initialValues[index] !== prevProps.initialValues[index]).length;
}

export default React.memo(Row, areEqual);