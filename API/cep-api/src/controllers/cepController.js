class CepController {
    async getAddressByCep(req, res) {
        const cep = req.params.cep;

        // Validate CEP
        if (!/^\d{8}$/.test(cep)) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'CEP inválido. Deve conter 8 dígitos numéricos.'
            });
        }

        try {
            const address = await fetchAddressByCep(cep);

            if (address.erro) {
                return res.status(404).json({
                    success: false,
                    data: null,
                    message: 'CEP não encontrado.'
                });
            }

            return res.status(200).json({
                success: true,
                data: address,
                message: 'Endereço encontrado com sucesso.'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                data: null,
                message: 'Erro ao buscar o endereço. Tente novamente mais tarde.'
            });
        }
    }
}

export default CepController;