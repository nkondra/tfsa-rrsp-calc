import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import CalculatorResults from './CalculatorResults';
import { percentToDecimal, valueAfterTax, valueOfTax, futureValue, realRateOfReturn } from '../formulas';

class CalculatorForm extends Component {
  state = {
    resultData: {},
    currentMarginalTaxRate: 40,
    averageTaxRateRetired: 40,
    depositAmount: 1000,
    yearsInvested: 20,
    returnOnInvestment: 6,
    inflationRate: 3,
    resultsBox: false,
  };

  handleChange = event => {
    const regex = /^[0-9\b.]+$/;
    const { name, value } = event.target;

    if (value === '' || regex.test(value)) {
      this.setState({ [`${name}`]: value });
    }
  };

  handleSubmit = event => {
    this.setState({ resultsBox: true });
    event.preventDefault();

    const {
      currentMarginalTaxRate,
      averageTaxRateRetired,
      depositAmount,
      yearsInvested,
      returnOnInvestment,
      inflationRate,
    } = this.state;

    const realReturnRate = percentToDecimal(realRateOfReturn(returnOnInvestment, inflationRate));

    const depositAmountAfterTax = valueAfterTax(depositAmount, currentMarginalTaxRate);
    const rrspFutureValue = futureValue(depositAmount, realReturnRate, yearsInvested);
    const tfsaFutureValue = futureValue(depositAmountAfterTax, realReturnRate, yearsInvested);

    const rrspTaxPaidOnWithdrawal = valueOfTax(rrspFutureValue, averageTaxRateRetired);

    const rrspTotalValueAfterTax = rrspFutureValue - rrspTaxPaidOnWithdrawal;
    const tfsaTotalValueAfterTax = tfsaFutureValue;

    this.setState({
      resultData: {
        depositAmount,
        depositAmountAfterTax,
        rrspFutureValue,
        tfsaFutureValue,
        rrspTaxPaidOnWithdrawal,
        rrspTotalValueAfterTax,
        tfsaTotalValueAfterTax,
      },
    });
  };

  render() {
    const {
      currentMarginalTaxRate,
      averageTaxRateRetired,
      depositAmount,
      yearsInvested,
      returnOnInvestment,
      inflationRate,
      resultsBox,
    } = this.state;

    return (
      <>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="currentMarginalTaxRate"
              label="Current Marginal Tax Rate"
              placeholder="Current Marginal Tax Rate"
              value={currentMarginalTaxRate}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="averageTaxRateRetired"
              label="Average Tax Rate in Retirement"
              placeholder="Average Tax Rate in Retirement"
              value={averageTaxRateRetired}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="depositAmount"
              label="Amount of Deposit"
              placeholder="Amount of Deposit"
              value={depositAmount}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="yearsInvested"
              label="Years Invested"
              placeholder="Years Invested"
              value={yearsInvested}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="returnOnInvestment"
              label="Return on Investment"
              placeholder="Return on Investment"
              value={returnOnInvestment}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="inflationRate"
              label="Inflation Rate"
              placeholder="Inflation Rate"
              value={inflationRate}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field control={Button} onClick={this.handleSubmit}>
            Calculate
          </Form.Field>
        </Form>
        {resultsBox ? <CalculatorResults data={this.state.resultData} /> : null}
      </>
    );
  }
}

export default CalculatorForm;
