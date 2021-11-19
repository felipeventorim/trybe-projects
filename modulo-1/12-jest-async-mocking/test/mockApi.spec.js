const api = require('../src/mockApi');

/*
A função fetchURL retorna um JSON com informações de um usuário aleatório buscadas da API 'randomuser.me'.
No entanto, nos testes abaixo, queremos que todas as vezes que chamarmos a API a resposta contenha as informações do nosso adminis..Cof! Cof!.. programador favorito, Tunicão.

Faça um mock da função fetchURL() de forma que,
independa de chamadas de API e retorne as seguintes informações do Tunico:
- Gênero: Masculino
- Primeiro nome: Antônio
- Último nome: Britto
- País: Brasil
- Email: tunico@bol.com.br (Sim, é um email do bol mesmo...)
- Nome de usuário: tunicao123
- Senha: 1234567890 (Usem senhas fortes, crianças!)

Note que as informações devem estar de acordo com o JSON
presente no README.md do projeto.

Dica: Utilizem os métodos jest.fn() ou jest.spyOn().

ATENÇÃO!!! Edite apenas este arquivo. Não altere os arquivos da pasta 'src'.
*/

describe('verifica o usuário', () => {
  const obj = {
    gender: 'female',
    name: { title: 'Ms', first: 'Deborah', last: 'Hanson' },
    location: {
      country: 'Ireland',
    },
    email: 'deborah.hanson@example.com',
    login: {
      username: 'bluewolf366',
      password: 'iverson3',
    },
  };

  api.fetchURL = jest
    .fn()
    .mockReturnValue(Promise.resolve(obj));

  test('verifica se o usuário é a Deborah', async () => (
    api.fetchURL().then((user) => {
      expect(user.gender).toEqual('female');
      expect(user.name.first).toEqual('Deborah');
      expect(user.name.last).toEqual('Hanson');
      expect(user.location.country).toEqual('Ireland');
      expect(user.email).toEqual('deborah.hanson@example.com');
      expect(user.login.username).toEqual('bluewolf366');
      expect(user.login.password).toEqual('iverson3');
    })
  ));
});
