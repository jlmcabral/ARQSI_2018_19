import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';

// import { actions as produtoActions, selectors as produtoSelectors } from '../../../../shared/state/produto';
import { actions as produtoActions, selectors as produtoSelectors } from '../../../../shared/state/produto';

import { actions as itemprodutoActions, selectors as itemprodutoSelectors } from '../../../../shared/state/node/itemproduto';
import { actions as categoriaActions, selectors as categoriaSelectors } from '../../../../shared/state/categoria';
import { actions as dimensaoActions, selectors as dimensaoSelectors } from '../../../../shared/state/dimensao';
import { actions as materialActions, selectors as materialSelectors } from '../../../../shared/state/material';
import { actions as restricaoActions, selectors as restricaoSelectors } from '../../../../shared/state/restricao';
import { Button } from '@material-ui/core';
import '../ItemProdutos.css';

class ItemProdutosCatalogo extends Component {
    componentWillMount() {
        this.props.getItemProdutosCatalogo();
        this.props.getCategoria();
        this.props.getDimensao();
        this.props.getMaterial();
        this.props.getProduto();
        this.props.getRestricao();
    }

    render() {
        const { itemprodutos, loading } = this.props;

        return (
            <section className="produtosWrapper">
                <Typography className="produtosTitle" variant="h5" align="center">
                    Catalogo de itemProdutos
                </Typography>
                {loading &&
                    <span>
                        loading...
                    </span>
                }
                {!loading &&
                    <table className="itemProdutosTable">
                        <thead className="itemProdutosTableThead">
                            <tr className="itemProdutosTableTheadTh">
                                <th className="itemProdutosTableTdTh">Nome</th>
                                <th className="itemProdutosTableTdTh">Descrição</th>
                                <th className="itemProdutosTableTdTh">Preço</th>
                                <th className="itemProdutosTableTdTh">Categoria</th>
                                <th className="itemProdutosTableTdTh">Dimensão</th>
                                <th className="itemProdutosTableTdTh">Produto Filho</th>
                                <th className="itemProdutosTableTdTh">Material</th>
                                <th className="itemProdutosTableTdTh">Restrição</th>
                                {/* <th className="itemProdutosTableTdTh">produtoId</th> */}
                            </tr>
                        </thead>
                        <tbody className="itemProdutosTableTbodyTd">
                            {itemprodutos.map(this.renderItemProdutoCatalogo, this)}
                        </tbody>
                    </table>
                }
                <div className="back" onClick={this.handleClickBackAreaCliente}>Back</div>
            </section>
        );
    }

    renderItemProdutoCatalogo(catalogo) {

        const produto = catalogo.produtoId && catalogo.produtoId.map(
            (id) => this.props.produtos.find(produto => (produto.id == id))
        );

        const categoria = this.props.categorias.find(categoria => (categoria.id == catalogo.categoriaId));

        const dimensao = this.props.dimensoes.find(dimensao => (dimensao.id == catalogo.dimensaoId));

        const material = catalogo.produtoId && catalogo.materialId.map(
            (id) => this.props.materiais.find(material => (material.id == id))
        );
        const restricao = catalogo.produtoId && catalogo.restricaoId.map(
            (id) => this.props.restricoes.find(restricao => (restricao.id == id))
        );

        return (
            <tr key={catalogo._id}>
                <td className="produtosTableTdTh">{catalogo.nome}</td>
                <td className="produtosTableTdTh">{catalogo.descricao}</td>
                <td className="produtosTableTdTh">{catalogo.preco}</td>
                <td className="produtosTableTdTh">{categoria && categoria.nome}</td>
                <td className="produtosTableTdTh">{dimensao && dimensao.tipo}</td>
                <td className="produtosTableTdTh">
                    {
                        produto && produto.map((produto) => (
                            produto && <span key={produto.id}>{produto.nome}</span>
                        ))
                    }
                </td>
                <td className="produtosTableTdTh">
                    {
                        material && material.map((material) => (
                            <span key={material.id}>{material.nome}</span>
                        ))
                    }
                </td>
                <td className="produtosTableTdTh">
                    {
                        restricao && restricao.map((restricao) => (
                            <span key={restricao.id}>{restricao.nome}</span>
                        ))
                    }
                </td>
                {/* <td className="produtosTableTdTh">{catalogo.produtoId}</td> */}
            </tr>
        );
    }

    handleClickBackAreaCliente = () => {
        this.props.history.push('/areacliente');
    };
}

ItemProdutosCatalogo.propTypes = {
    itemprodutos: PropTypes.array,
    categorias: PropTypes.array,
    dimensoes: PropTypes.array,
    materiais: PropTypes.array,
    restricoes: PropTypes.array,
    produtos: PropTypes.array,
    loading: PropTypes.bool,
    getItemProdutosCatalogo: PropTypes.func,
    getCategoria: PropTypes.func,
    getDimensao: PropTypes.func,
    getMaterial: PropTypes.func,
    getRestricao: PropTypes.func,
    getProduto: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    const loading = itemprodutoSelectors.isLoading(state) || categoriaSelectors.isLoading(state)
        || dimensaoSelectors.isLoading(state) || materialSelectors.isLoading(state) || restricaoSelectors.isLoading(state)
        || produtoSelectors.isLoading(state);

    return {
        produtos: produtoSelectors.getProdutos(state),
        itemprodutos: itemprodutoSelectors.getItemProdutosCatalogo(state),
        categorias: categoriaSelectors.getCategorias(state),
        dimensoes: dimensaoSelectors.getDimensoes(state),
        materiais: materialSelectors.getMateriais(state),
        restricoes: restricaoSelectors.getRestricoes(state),
        loading,
    };
};

const mapDispatchToProps = {
    getItemProdutosCatalogo: itemprodutoActions.getItemProdutosCatalogo,
    getCategoria: categoriaActions.getCategoria,
    getDimensao: dimensaoActions.getDimensao,
    getMaterial: materialActions.getMaterial,
    getRestricao: restricaoActions.getRestricao,
    getProduto: produtoActions.getProduto,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(ItemProdutosCatalogo);
