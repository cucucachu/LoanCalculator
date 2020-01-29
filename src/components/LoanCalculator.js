import React, { Component } from 'react';

import Header from './common/Header';
import VerticalPad from './common/VerticalPad';
import PrimaryFormFields from './inputs/PrimaryFormFields';
import SecondaryFormFields from './inputs/SecondaryFormFields';
import CalculationResult from './CalculationResult';
import RepaymentGraph from './RepaymentGraph';
import calculateResult from '../utility/calculateResult';

class LoanCalculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loanAmount: 0,
			downPayment: 0,
			toCalculate: 'months',
			interestRate: 0,
			months: 0,
			monthlyPayment: 0,
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const state = {};
		Object.assign(state, this.state);
		state[event.target.id] = event.target.value;
		state[state.toCalculate] = calculateResult(
			state.toCalculate, state.loanAmount, state.downPayment, 
			state.interestRate, state.monthlyPayment, state.months
		);

		this.setState(state);
	}

	render() {
		return (
			<div>
				<VerticalPad />
				<Header />
				<VerticalPad />
				<div id="explanation" className="container">
					<CalculationResult 
						show={this.state.loanAmount !== 0}
						result={this.state[this.state.toCalculate]}
						toCalculate={this.state.toCalculate}
					/>
				</div>
				<VerticalPad />
				<div id="loanForm" className="container">
					<h4>Please Enter the Loan Information Below</h4>
					<br></br>
					<form>
						<PrimaryFormFields
							loanAmount={this.state.loanAmount}
							downPayment={this.state.downPayment}
							toCalculate={this.state.toCalculate}
							onChange={this.handleChange} 
						/>
						<SecondaryFormFields 
							interestRate={this.state.interestRate}
							monthlyPayment={this.state.monthlyPayment}
							months={this.state.months}
							toCalculate={this.state.toCalculate}
							onChange={this.handleChange}
						/>
					</form>
				</div>
				<VerticalPad />
				<div id="loanForm" className="container">
					<RepaymentGraph 
						totalLoanAmount={Number(this.state.loanAmount) - Number(this.state.downPayment)}
						monthlyPayment={Number(this.state.monthlyPayment)}
						interestRate={Number(this.state.interestRate)}
						months={Number(this.state.months)}
					/>
				</div>
			</div>
		);
	}
}

export default LoanCalculator;