import React from 'react';

import DollarInput from './DollarInput';
import Selector from './Selector';

function PrimaryFormFields(props) {
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <Selector
                        label="What would you like to calculate?"
                        inputId="toCalculate"
                        value={props.toCalculate}
                        options={toCalculateOptions()}
                        onChange={props.onChange} 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <DollarInput
                        label="Loan Amount"
                        inputId="loanAmount"
                        value={props.loanAmount}
                        onChange={props.onChange} 
                    />
                </div>
                <div className="col-md">
                    <DollarInput
                        label="Down Payment"
                        inputId="downPayment"
                        value={props.downPayment}
                        onChange={props.onChange} 
                    />
                </div>
            </div>
        </div>
    )

}

function toCalculateOptions() {
    return [
        {
            name: 'Number of Months',
            value: 'months',
        },
        {
            name: 'Monthly Payment',
            value: 'monthlyPayment',
        },
        {
            name: 'Annual Interest Rate',
            value: 'interestRate',
        },
    ]
}

export default PrimaryFormFields;