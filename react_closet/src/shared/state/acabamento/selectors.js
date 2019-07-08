export const getAcabamentos = (state) => {
    return state.acabamento.result;
};

export const getAcabamentoByName = (state, name) => {
    return state.acabamento.result.find((acabamento) => (acabamento.name == name));
};

export const getAcabamentoById = (state, id) => {
    return state.acabamento.result.find((acabamento) => (acabamento.id == id));
};

export const isLoading = (state) => {
    return state.acabamento.loading;
};
