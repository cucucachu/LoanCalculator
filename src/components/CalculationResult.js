import React from 'react';

function CalculationResult(props) {
    if (props.show && resultText(props) !== '') {
        return (
            <div className="alert alert-info">
                {resultText(props)}
            </div>
        )
    }
    return <div></div>
}

function resultText(props) {
    switch (props.toCalculate) {
        case 'monthlyPayment':
            if (isNaN(props.result)) {
                return '';
            }
            if (props.result === 0) {
                return 'You do not need to pay anything.';
            }
            if (props.result === Infinity) {
                return 'You cannot pay off this loan.';
            }
            else {
                return 'Your monthly payment would be $' + Number(props.result).toFixed(2);
            }
        case 'months':
            if (props.result === -1 || isNaN(props.result)) {
                return '';
            }
            if (props.result === Infinity) {
                return 'Your loan would never be paid off. The monthly payment is not enough to cover the interest.';
            }
            else {
                return 'Your loan would be paid back after ' + Math.ceil(Number(props.result)) + ' months.';
            }
        case 'interestRate':
            if (props.result < 0.001) {
                return 'You cannot pay off this loan in the desired time no matter the interest.';
            }
            else {
                return 'You\'ll want an annual interest rate of ' + (Number(props.result)).toFixed(2) + '% or less.';
            }
        default:
            throw new Error('Unknown toCalculate Value.')
    }
}

export default CalculationResult;