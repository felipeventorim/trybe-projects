import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExpenseItem from './ExpenseItem';

const tableHeaders = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

class ExpenseList extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            { tableHeaders.map((header, index) => (
              <th key={ index }>{ header }</th>
            )) }
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseItem key={ expense.id } expense={ expense } />
          ))}
        </tbody>
      </table>
    );
  }
}

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(ExpenseList);
