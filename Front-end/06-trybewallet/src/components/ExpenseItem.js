import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  editExpense as editExpenseAction,
  removeExpense as removeExpenseAction,
} from '../actions';

import Button from './Button';

class ExpenseItem extends Component {
  render() {
    const { expense, removeExpense, editExpense } = this.props;
    const { id, description, method, tag, value, currency, exchangeRates } = expense;

    const [currencyName] = exchangeRates[currency].name.split('/');
    const ask = parseFloat(exchangeRates[currency].ask);
    const fixedAsk = ask.toFixed(2);
    const convertedValue = (value * ask).toFixed(2);

    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currencyName }</td>
        <td>{ fixedAsk }</td>
        <td>{ convertedValue }</td>
        <td>Real</td>
        <td>
          <Button
            value={ id }
            onClick={ ({ target }) => editExpense(target.value) }
            text="Editar"
            testId="edit-btn"
          />
          <Button
            value={ id }
            onClick={ ({ target }) => removeExpense(target.value) }
            text="X"
            testId="delete-btn"
          />
        </td>
      </tr>
    );
  }
}

ExpenseItem.propTypes = {
  expense: PropTypes.objectOf(PropTypes.any).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeExpenseAction(id)),
  editExpense: (id) => dispatch(editExpenseAction(id)),
});

export default connect(null, mapDispatchToProps)(ExpenseItem);
