import React from 'react';
import CanvasJSReact from '../canvasjs/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function RepaymentGraph(props) {
    if (!sufficientData(props)) {
        return <div></div>
    }

    const data = deriveData(props);

    const options = {
        theme: "light2",
        animationEnabled: true,
        title: {
            text: "Repayment"
        },
        axisX: {
            title: 'Months',
            includeZero: true,
        },
        axisY: {
            title: "$",
            includeZero: true,
        },
        toolTip: {
            shared: true,
        },
        data: [
            {
                type: "area",
                name: 'Debt Remaining',
                showInLegend: true,
                xValueFormatString: 'Month: #',
                yValueFormatString: '$#,###.##',
                dataPoints: data.debt,
            },
            {
                type: "area",
                name: 'Amount Paid',
                showInLegend: true,
                xValueFormatString: 'Month: #',
                yValueFormatString: '$#,###.##',
                dataPoints: data.paid,
            },
            {
                type: "area",
                name: 'Interest Paid',
                showInLegend: true,
                xValueFormatString: 'Month: #',
                yValueFormatString: '$#,###.##',
                dataPoints: data.interest,
            },
        ]
    }
    return (
		<div>
            <CanvasJSChart options = {options}/>
        </div>
    );
}

function sufficientData(props) {
    const numberProperties = ['totalLoanAmount', 'interestRate', 'monthlyPayment', 'months'];

    for (const property of numberProperties) {
        const number = props[property];
        if (number <= 0 || number === Infinity || isNaN(number)) {
            return false;
        }
    }

    return true;
}

function deriveData(props) {
    const debt = [];
    const interestData = [];
    const totalAmountPaidData = [];

    const monthlyInterestRate = props.interestRate / 1200;
    const max = 1000;

    let month = 0;
    let amount = props.totalLoanAmount;
    let interest = 0;
    let totalAmountPaid = 0;

    debt.push({x: month, y: amount});
    month++;

    while(month < max && amount > 0) {
        interest += monthlyInterestRate * amount;
        totalAmountPaid += props.monthlyPayment;
        amount = amount + (monthlyInterestRate * amount) - props.monthlyPayment;
        
        if (amount < 0) {
            amount = 0;
        }
        debt.push({x: month, y: amount});
        interestData.push({x: month, y: interest});
        totalAmountPaidData.push({x: month, y: totalAmountPaid});
        month++;
    }

    return {
        debt,
        interest: interestData,
        paid: totalAmountPaidData,
    };
}

export default RepaymentGraph;