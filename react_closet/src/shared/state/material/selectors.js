export const getMateriais = (state) => {
    return state.material.result;
};

export const getMaterialByName = (state, name) => {
    return state.material.result.find((material) => (material.name == name));
};

export const getMaterialById = (state, id) => {
    return state.material.result.find((material) => (material.id == id));
};

export const getMaterialByAcabamentoId = (state, acabamentoId) => {
    return state.material.result.find((material) => (material.acabamentoId == acabamentoId));
};

export const isLoading = (state) => {
    return state.material.loading;
};
