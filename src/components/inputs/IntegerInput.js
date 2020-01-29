import React from 'react';

function IntegerInput(props) {
    return (
        <div>
            <label><strong>{props.label}</strong></label>
            <div className="input-group mb-3">
                <input 
                    id={props.inputId}
                    className="form-control"
                    type="number"
                    step="1"
                    min="0"
                    value={props.value}
                    onChange={props.onChange}
                ></input>
            </div>
        </div>
    )
}

export default IntegerInput;