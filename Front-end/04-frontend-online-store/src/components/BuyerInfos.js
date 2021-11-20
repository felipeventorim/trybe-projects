import React from 'react';
import Input from './Input';
import Select from './Select';

export default class BuyerInfos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      cpf: '',
      email: '',
      phone: '',
      cep: '',
      address: '',
      complement: '',
      number: '',
      city: '',
      state: '',
    };
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const {
      fullname,
      cpf,
      email,
      phone,
      cep,
      address,
      complement,
      number,
      city,
      state,
    } = this.state;
    return (
      <form>
        <h4>Informações do Comprador</h4>
        <Input
          name="fullname"
          value={ fullname }
          placeholder="Nome Completo"
          handleInput={ this.handleInput }
        />
        <Input
          name="cpf"
          value={ cpf }
          placeholder="CPF"
          handleInput={ this.handleInput }
        />
        <Input
          name="email"
          value={ email }
          placeholder="Email"
          handleInput={ this.handleInput }
        />
        <Input
          name="phone"
          value={ phone }
          placeholder="Telefone"
          handleInput={ this.handleInput }
        />
        <Input
          name="cep"
          value={ cep }
          placeholder="CEP"
          handleInput={ this.handleInput }
        />
        <Input
          name="address"
          value={ address }
          placeholder="Rua"
          handleInput={ this.handleInput }
        />
        <Input
          name="complement"
          value={ complement }
          placeholder="Complemento"
          handleInput={ this.handleInput }
        />
        <Input
          name="number"
          value={ number }
          placeholder="Número"
          handleInput={ this.handleInput }
        />
        <Input
          name="city"
          value={ city }
          placeholder="Cidade"
          handleInput={ this.handleInput }
        />
        <Select
          value={ state }
          handleInput={ this.handleInput }
        />
      </form>
    );
  }
}
