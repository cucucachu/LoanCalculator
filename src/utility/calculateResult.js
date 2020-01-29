function calculateResult(toCalculate, loanAmount=0, downPayment=0, interestRate=0, monthlyPayment=0, months=0) {
    loanAmount = Number(loanAmount);
    downPayment = Number(downPayment);
    interestRate = Number(interestRate);
    monthlyPayment = Number(monthlyPayment);
    months = Number(months);
    
    switch (toCalculate) {
        case 'monthlyPayment':
            return calculateMonthlyPayment(loanAmount, downPayment, interestRate, months);
        case 'months':
            return calculateMonths(loanAmount, downPayment, interestRate, monthlyPayment);
        case 'interestRate':
            return calculateAnnualInterestRate(loanAmount, downPayment, monthlyPayment, months);
        default:
            throw new Error('Unknown toCalculate Value.')
    }
}

function calculateMonthlyPayment(loanAmount, downPayment, interestRate, months) {
    if (downPayment >= loanAmount) {
        return 0;
    }
    if (months === 0) {
        return Infinity;
    }

    interestRate = interestRate / 100.0;

    const monthlyInterestRate = interestRate / 12.0;

    const accruedInterest = Math.pow((1 + monthlyInterestRate), months);
    const discoutFactor = (accruedInterest - 1) / (monthlyInterestRate * accruedInterest);
    const monthlyPayment = (loanAmount - downPayment) / discoutFactor;

    return monthlyPayment;
}

function calculateMonths(loanAmount, downPayment, interestRate, monthlyPayment) {
    if (downPayment >= loanAmount) {
        return 0;
    }

    interestRate = interestRate / 100.0;

    const monthlyInterestRate = interestRate / 12.0;
    const totalLoanAmount = loanAmount - downPayment;



    if (totalLoanAmount === 0 && monthlyPayment === 0) {
        return -1;
    }
    if (monthlyInterestRate === 0) {
        return totalLoanAmount / monthlyPayment;
    }
    if ((totalLoanAmount * monthlyInterestRate) > monthlyPayment) {
        return Infinity;
    }

    const months = Math.log(monthlyPayment / (monthlyPayment - (totalLoanAmount * monthlyInterestRate))) / Math.log(1 + monthlyInterestRate);
    return months;
}

function calculateAnnualInterestRate(loanAmount, downPayment, monthlyPayment, months) {
    if (downPayment >= loanAmount) {
        return 100;
    }

    let interestRate = 50;
    let monthsGuess = calculateMonths(loanAmount, downPayment, interestRate, monthlyPayment);
    let distance = monthsGuess === Infinity ? Infinity : monthsGuess - months;
    let step = 25;
    let max = 0;

    if (loanAmount - downPayment > monthlyPayment * months) {
        return 0;
    }

    while(Math.abs(distance) > 0.01 && max < 20) {

        if (distance > 0) {
            interestRate = interestRate - (step);
        }
        else {
            interestRate = interestRate + (step);;
        }
        max++;
        step = step / 2;
        monthsGuess = calculateMonths(loanAmount, downPayment, interestRate, monthlyPayment)
        distance = monthsGuess === Infinity ? Infinity : monthsGuess - months;
    }

    return interestRate;
}



export default calculateResult;