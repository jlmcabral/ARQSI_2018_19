export const getProdutos = (state) => {
    return state.produto.result;
};

export const getProdutoByName = (state, name) => {
    return state.produto.result.find((produto) => (produto.name == name));
};

export const getProdutoById = (state, id) => {
    return state.produto.result.find((produto) => (produto.id == id));
};

export const isLoading = (state) => {
    return state.produto.loading;
};
