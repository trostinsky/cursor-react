import React from "react";
import "./button.css";

const clickHandler = () => {
    alert("click");
}

export default (props) => {

    // state = { type: this.props.type }
    // () => { this.setState({ type: "delete" });

    //const props = { children: "Unused", disabled: true };
    const type = props.type || 'default';
    const typeClassName = `button--${type}`;
    const disabledClassName = props.disabled ? `button--disabled` : "";
    return (
        <button
            onClick={clickHandler}
            className={`button ${typeClassName} ${disabledClassName}`}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}