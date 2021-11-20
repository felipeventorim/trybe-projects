import React from 'react';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import CreditCardIcon from '@material-ui/icons/CreditCard';

export default class PaymentMethod extends React.Component {
  render() {
    return (
      <div>
        <h4>Método de Pagamento</h4>
        <label htmlFor="barcode">
          Boleto
          <input id="barcode" name="payment" type="radio" />
          <HorizontalSplitIcon style={ { fontSize: 70 } } />
        </label>
        <h5>Cartão de Crédito</h5>
        <label htmlFor="Visa">
          Visa
          <input id="Visa" name="payment" type="radio" />
          <CreditCardIcon style={ { fontSize: 70 } } />
        </label>
        <label htmlFor="MasterCard">
          MasterCard
          <input id="MasterCard" name="payment" type="radio" />
          <CreditCardIcon style={ { fontSize: 70 } } />
        </label>
        <label htmlFor="Elo">
          Elo
          <input id="Elo" name="payment" type="radio" />
          <CreditCardIcon style={ { fontSize: 70 } } />
        </label>
      </div>
    );
  }
}
