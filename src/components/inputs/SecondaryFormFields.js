import React from 'react';

import DollarInput from './DollarInput';
import PercentageInput from './PercentageInput';
import IntegerInput from './IntegerInput';

function SecondaryFormFields(props) {
    return (
        <div className="row">
            {renderInterestRateInput(props)}
            {renderMonthlyPaymentInput(props)}
            {renderNumberOfMonthsInput(props)}
        </div>
    )
}

function renderInterestRateInput(props) {
    if (props.toCalculate !== 'interestRate') {
        return (
            <div className="col-md">
                <PercentageInput
                    label="Annual Interest Rate"
                    inputId="interestRate"
                    value={props.interestRate}
                    onChange={props.onChange} 
                />
            </div>
        )
    }
    else {
        return <div></div>
    }
}

function renderMonthlyPaymentInput(props) {
    if (props.toCalculate !== 'monthlyPayment') {
        return (
            <div className="col-md">
                <DollarInput
                    label="Monthly Payment"
                    inputId="monthlyPayment"
                    value={props.monthlyPayment}
                    onChange={props.onChange} 
                />
            </div>
        )
    }
    else {
        return <div></div>
    }
}

function renderNumberOfMonthsInput(props) {
    if (props.toCalculate !== 'months') {
        return (
            <div className="col-md">
                <IntegerInput
                    label="Number of Months"
                    inputId="months"
                    value={props.months}
                    onChange={props.onChange} 
                />
            </div>
        )
    }
    else {
        return <div></div>
    }
}

export default SecondaryFormFields;