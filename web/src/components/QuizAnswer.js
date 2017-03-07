import React from 'react'

const component = (props) => {

    const notifyChecked = () => {
        props.handleChecked(props.answerId);
    };
    return (
        <div className="">
            <input type='radio' id={`answer${props.answerId}`} name='product' value={props.answerId} checked={props.checked} onChange={notifyChecked} />
            <label htmlFor={`answer${props.answerId}`} >{props.answer}</label>
        </div>
    )
}

export default component