import {
    createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import produtoReducer from './produto';
import categoriaReducer from './categoria';
import dimensaoReducer from './dimensao';
import materialReducer from './material';
import acambamentoReducer from './acabamento';
import restricaoReducer from './restricao';

//node
import itemprodutoReducer from './node/itemproduto';
import encomendaReducer from './node/encomenda';


export default () => {
    const reducer = combineReducers({
        produto: produtoReducer,
        categoria: categoriaReducer,
        dimensao: dimensaoReducer,
        material: materialReducer,
        acabamento: acambamentoReducer,
        restricao: restricaoReducer,
        //node
        itemproduto: itemprodutoReducer,
        encomenda: encomendaReducer,
    });

    const middlewares = [thunk];
    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    /* eslint-disable-next-line no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducer, composeEnhancers(...enhancers));

    return store;
};
