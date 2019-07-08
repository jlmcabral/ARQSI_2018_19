export const getRestricoes = (state) => {
    return state.restricao.result;
};

export const getRestricaoByName = (state, name) => {
    return state.restricao.result.find((restricao) => (restricao.name == name));
};

export const getRestricaoById = (state, id) => {
    return state.restricao.result.find((restricao) => (restricao.id == id));
};

export const isLoading = (state) => {
    return state.restricao.loading;
};
