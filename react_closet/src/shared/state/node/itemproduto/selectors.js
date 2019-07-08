export const getItemProdutos = (state) => {
    return state.itemproduto.result;
};

export const getItemProdutosCatalogo = (state) => {
    return state.itemproduto.result;
};

export const getItemProdutoByName = (state, name) => {
    return state.itemproduto.result.find((itemproduto) => (itemproduto.name == name));
};

export const getItemProdutoById = (state, _id) => {
    return state.itemproduto.result.find((itemproduto) => (itemproduto._id == _id));
};

export const isLoading = (state) => {
    return state.itemproduto.loading;
};
