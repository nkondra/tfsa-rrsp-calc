import React, { Component } from 'react';
import { Segment, Divider, Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import { formatPrice } from '../formulas';

const ResultBar = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  text-align: left;
  padding: 1rem;
  border-radius: 0.3rem;
  margin: 0.25rem 0;
  background: ${props => (props.tfsa ? '#2289b1' : '#31c5fe')};

  span {
    display: block;
    text-align: right;
    font-weight: bold;
  }
`;

export default class CalculatorResults extends Component {
  state = {
    screenWidth: window.innerWidth,
  };

  updateDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const {
      depositAmountAfterTax,
      depositAmount,
      rrspFutureValue,
      tfsaFutureValue,
      rrspTaxPaidOnWithdrawal,
      rrspTotalValueAfterTax,
      tfsaTotalValueAfterTax,
    } = this.props.data;
    const { screenWidth } = this.state;
    return (
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <h3>RRSP</h3>
            <ResultBar>
              Amount (After Tax) <span>{formatPrice(depositAmount)}</span>
            </ResultBar>
            <ResultBar>
              Future Value <span>{formatPrice(rrspFutureValue)}</span>
            </ResultBar>
            <ResultBar>
              Tax Paid on Withdrawal <span>{formatPrice(rrspTaxPaidOnWithdrawal)}</span>
            </ResultBar>
            <ResultBar>
              After Tax Future Value <span>{formatPrice(rrspTotalValueAfterTax)}</span>
            </ResultBar>
          </Grid.Column>
          <Grid.Column>
            <h3>TFSA</h3>
            <ResultBar tfsa>
              Amount (After Tax) <span>{formatPrice(depositAmountAfterTax)}</span>
            </ResultBar>
            <ResultBar tfsa>
              Future Value <span>{formatPrice(tfsaFutureValue)}</span>
            </ResultBar>
            <ResultBar tfsa>
              Tax Paid on Withdrawal <span>{formatPrice(0)}</span>
            </ResultBar>
            <ResultBar tfsa>
              After Tax Future Value <span>{formatPrice(tfsaTotalValueAfterTax)}</span>
            </ResultBar>
          </Grid.Column>
        </Grid>

        {screenWidth > 768 ? <Divider vertical>Or</Divider> : null}
      </Segment>
    );
  }
}
