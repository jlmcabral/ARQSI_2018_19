export const getDimensoes = (state) => {
    return state.dimensao.result;
};

export const getDimensaoByTipo = (state, tipo) => {
    return state.dimensao.result.find((dimensao) => (dimensao.tipo == tipo));
};

export const getDimensaoById = (state, id) => {
    return state.dimensao.result.find((dimensao) => (dimensao.id == id));
};

export const isLoading = (state) => {
    return state.dimensao.loading;
};
