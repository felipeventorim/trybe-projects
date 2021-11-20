import React from 'react';
import PropTypes from 'prop-types';

class ProductRates extends React.Component {
  renderRates() {
    const { rating } = this.props;
    return rating.map((each, i) => {
      const JSX = (
        <div>
          Comentário:
          {' '}
          {each.comment}
        </div>
      );

      return (
        <div key={ i }>
          <div>
            Classificação:
            {' '}
            {each.rate}
          </div>
          {each.comment === '' ? null : JSX}
        </div>
      );
    });
  }

  render() {
    const { rating } = this.props;
    return rating ? <div>{this.renderRates()}</div> : <div>0 avaliações</div>;
  }
}

ProductRates.propTypes = {
  rating: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductRates;
