import React, { useRef, useState, useEffect } from 'react';
import './Input.css'
import copyImage from '../../assets/images/file_copy-24px.svg';
import deleteImage from '../../assets/images/cancel-24px.svg';
import visualiseImage from '../../assets/images/remove_red_eye-24px.svg';

function Input({index, valueIndex, value, initialValue, onChange, duplicate}) {

    const [recheckHeight, setRecheckHeight] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [visualise, setVisualise] = useState(false);
    const input = useRef();

    const setClassName = () => {
        let name = 'input'
        name += !value ? ' input--empty' : '';
        name += value !== initialValue ? ' input--updated' : '';
        name += duplicate ? ' input--duplicate' : '';
        name += visualise ? ' input--visualise' : '';
        return name
    }

    useEffect((e) => {
        // input.current.style.height = 'inherit';
        if(input && input.current) {
            input.current.style.height = `${input.current.scrollHeight}px`;
        }
    });

    return (
        <div className={setClassName()} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={() => setIsHover(false)}>
            {visualise ?
            <p style={{margin: 0}} dangerouslySetInnerHTML={{__html: value}} onClick={() => {
                setVisualise(false);
            }}></p> : 
            <textarea 
                ref={input}
                value={value} 
                onChange={(e) => {
                    const value = e.nativeEvent.target.value;
                    onChange(index, valueIndex, isObject(value) ? JSON.parse(value) : value);
                }}
                rows={1}
                // type="text" 
            ></textarea>}
            <div className={"input__icons" + ((isHover && " input__icons--visible") || "")}>
                <img alt="visualise" src={visualiseImage} onClick={() => {
                    setVisualise(!visualise);
                }} />
                <img alt="copy" className={visualise ? 'hidden' : ''} src={copyImage} onClick={() => {
                    input.current.select();
                    input.current.setSelectionRange(0, 99999);
                    document.execCommand("copy");
                    setTimeout(() => {
                        input.current.blur();
                    }, 300);
                }} />
                <img alt="delete" className={visualise ? 'hidden' : ''} src={deleteImage} onClick={() => {
                    input.current.select();
                    input.current.setSelectionRange(0, 99999);
                    document.execCommand("delete");
                }} />
            </div>
        </div>
    )
}

function isObject(value) {
    try{
        JSON.parse(value);
    } catch(e) {
        return false;
    }
    return true;
}

function areEqual(previous, { index, valueIndex, value, initialValue, duplicate}) {
    return previous.value === value && 
        previous.index === index && 
        previous.valueIndex === valueIndex && 
        previous.initialValue === initialValue && 
        previous.duplicate === duplicate;
}

export default React.memo(Input,areEqual);