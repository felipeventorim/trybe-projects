import React from 'react';
import PropTypes from 'prop-types';

class RateForm extends React.Component {
  constructor() {
    super();

    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      comment: '',
      rate: null,
    };
  }

  onFormChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    const { rate, comment } = this.state;
    const { addRate, id } = this.props;

    const rating = { rate, comment };
    addRate(id, rating);
    this.setState({ comment: '' });

    // this.setState((prevState) => ({
    //   ratings: [...prevState.ratings, { rate, comment }],
    // }), this.setState({ rate: null, comment: '' }));
  }

  render() {
    const { comment, rate } = this.state;
    return (
      <form>
        <label htmlFor="1">
          <input
            type="radio"
            id="1"
            name="rate"
            value={ 1 }
            required
            onChange={ this.onFormChange }
          />
          1
        </label>
        <label htmlFor="2">
          <input
            type="radio"
            id="2"
            name="rate"
            value={ 2 }
            onChange={ this.onFormChange }
          />
          2
        </label>
        <label htmlFor="3">
          <input
            type="radio"
            id="3"
            name="rate"
            value={ 3 }
            onChange={ this.onFormChange }
          />
          3
        </label>
        <label htmlFor="4">
          <input
            type="radio"
            id="4"
            name="rate"
            value={ 4 }
            onChange={ this.onFormChange }
          />
          4
        </label>
        <label htmlFor="5">
          <input
            type="radio"
            id="5"
            name="rate"
            value={ 5 }
            onChange={ this.onFormChange }
          />
          5
        </label>

        <label htmlFor="user-comment">
          Deixe seu comentário:
          <textarea
            name="comment"
            id="user-comment"
            data-testid="product-detail-evaluation"
            value={ comment }
            onChange={ this.onFormChange }
          />
        </label>

        <button
          type="submit"
          onClick={ this.onFormSubmit }
          disabled={ !rate }
        >
          Enviar

        </button>
      </form>
    );
  }
}

RateForm.propTypes = {
  addRate: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default RateForm;
