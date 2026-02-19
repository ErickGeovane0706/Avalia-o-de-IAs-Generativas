const axios = require('axios');

const fetchAddressByCep = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching data from ViaCEP');
    }
};

module.exports = {
    fetchAddressByCep,
};