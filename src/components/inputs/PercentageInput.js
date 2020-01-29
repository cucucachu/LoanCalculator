import React from 'react';

function PercentageInput(props) {
    return (
        <div>
            <label><strong>{props.label}</strong></label>
            <div className="input-group mb-3">
                <input 
                    id={props.inputId}
                    className="form-control"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={props.value}
                    onChange={props.onChange}
                ></input>
                <div className="input-group-append">
                    <span className="input-group-text">%</span>
                </div>
            </div>
        </div>
    )
}

export default PercentageInput;