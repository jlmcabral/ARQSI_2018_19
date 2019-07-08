export const getCategorias = (state) => {
    return state.categoria.result;
};

export const getCategoriaByName = (state, name) => {
    return state.categoria.result.find((categoria) => (categoria.name == name));
};

export const getCategoriaById = (state, id) => {
    return state.categoria.result.find((categoria) => (categoria.id == id));
};

export const getCategoriaByDescricao = (state, descricao) => {
    return state.categoria.result.find((categoria) => (categoria.descricao == descricao));
};

export const getCategoriaByCategoriaPai = (state, categoriaPai) => {
    return state.categoria.result.find((categoria) => (categoria.categoriaPai == categoriaPai));
};

export const isLoading = (state) => {
    return state.categoria.loading;
};
