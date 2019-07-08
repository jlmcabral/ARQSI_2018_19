export const getEncomendas = (state) => {
    return state.encomenda.result;
};

export const getEncomendaCatalogo = (state) => {
    return state.encomenda.result;
};

export const getEncomendaByName = (state, name) => {
    return state.encomenda.result.find((encomenda) => (encomenda.name == name));
};

export const getEncomendaById = (state, _id) => {
    return state.encomenda.result.find((encomenda) => (encomenda._id == _id));
};

export const isLoading = (state) => {
    return state.encomenda.loading;
};
