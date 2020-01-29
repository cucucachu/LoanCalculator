import React from 'react';

function Selector(props) {
    return (
        <div>
            <label><strong>{props.label}</strong></label>
            <div className="form-group">
                <select 
                    id={props.inputId}
                    className="form-control"
                    value={props.value}
                    onChange={props.onChange}
                >
                    {
                        props.options.map(option => {
                            return (
                                <option value={option.value} key={option.value + '-selector-option'}>{option.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default Selector;