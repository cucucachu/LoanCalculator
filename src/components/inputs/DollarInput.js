import React from 'react';

function DollarInput(props) {
    return (
        <div>
            <label><strong>{props.label}</strong></label>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                </div>
                <input 
                    id={props.inputId}
                    className="form-control"
                    type="number"
                    step="0.01"
                    min="0"
                    value={props.value}
                    onChange={props.onChange}
                ></input>
            </div>
        </div>
    )
}

export default DollarInput;