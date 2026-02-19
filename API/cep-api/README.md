# CEP API

Este é um microsserviço em Node.js que fornece uma API RESTful para buscar endereços a partir de um CEP utilizando a API pública do ViaCEP.

## Estrutura do Projeto

```
cep-api
├── src
│   ├── controllers
│   │   └── cepController.js
│   ├── routes
│   │   └── cepRoutes.js
│   ├── services
│   │   └── viaCepService.js
│   └── index.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd cep-api
   ```

2. Instale as dependências:
   ```
   npm install
   ```

## Executando o Servidor

Para iniciar o servidor, execute o seguinte comando:
```
npm start
```

O servidor estará rodando em `http://localhost:3000`.

## Testando a Rota

Você pode testar a rota utilizando cURL ou Insomnia.

### Usando cURL

Para buscar um endereço pelo CEP, execute o seguinte comando:
```
curl http://localhost:3000/api/cep/<CEP>
```
Substitua `<CEP>` pelo CEP desejado (apenas números, com 8 dígitos).

### Exemplo

Para buscar o endereço do CEP `01001-000`, você pode usar:
```
curl http://localhost:3000/api/cep/01001000
```

## Respostas da API

A resposta da API será um JSON com a seguinte estrutura:
```json
{
  "success": true,
  "data": {
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1002",
    "ddd": "11",
    "siafi": "7087"
  },
  "message": "Endereço encontrado com sucesso."
}
```

Em caso de erro, a resposta será:
```json
{
  "success": false,
  "data": null,
  "message": "CEP inválido ou não encontrado."
}
```

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções.