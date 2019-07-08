import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import { actions as produtoActions, selectors as produtoSelectors } from '../../shared/state/produto';
import { actions as categoriaActions, selectors as categoriaSelectors } from '../../shared/state/categoria';
import { actions as dimensaoActions, selectors as dimensaoSelectors } from '../../shared/state/dimensao';
import { actions as materialActions, selectors as materialSelectors } from '../../shared/state/material';
import { actions as restricaoActions, selectors as restricaoSelectors } from '../../shared/state/restricao';
import { Button } from '@material-ui/core';
import './Produtos.css';

class Produtos extends Component {
    componentWillMount() {
        this.props.getProduto();
        this.props.getCategoria();
        this.props.getDimensao();
        this.props.getMaterial();
        this.props.getRestricao();
    }

    render() {
        const { produtos, loading } = this.props;

        return (
            <section className="produtosWrapper">
                <Typography className="produtosTitle" variant="h5" align="center">
                    Lista de Produtos
                </Typography>
                {loading &&
                    <span>
                        loading...
                    </span>
                }
                {!loading &&
                    <span>
                        <Button id="novo" onClick={this.handleButtonNovoProduto}>Novo</Button>
                    </span>
                }
                {!loading &&
                    <table className="produtosTable">
                        <thead className="produtosTableThead">
                            <tr className="produtosTableTheadTh">
                                <th className="produtosTableTdTh">Nome</th>
                                <th className="produtosTableTdTh">Descrição</th>
                                <th className="produtosTableTdTh">Preço</th>
                                <th className="produtosTableTdTh">Categoria</th>
                                <th className="produtosTableTdTh">Dimensão</th>
                                <th className="produtosTableTdTh">Produto Filho</th>
                                <th className="produtosTableTdTh">Material</th>
                                <th className="produtosTableTdTh">Restrição</th>
                                <th className="produtosTableTdTh"></th>
                                <th className="produtosTableTdTh"></th>
                            </tr>
                        </thead>
                        <tbody className="produtosTableTbodyTd">
                            {produtos.map(this.renderProduto, this)}
                        </tbody>
                    </table>
                }
            <div className="back" onClick={this.handleClickBackCatalogo}>Back</div> 
            </section>
        );
    }

    renderProduto(produto) {

        const produtoFilho = produto.produtoId && produto.produtoId.map(
            (id) => this.props.produtos.find(produtoFilho => (produtoFilho.id == id))
        );

        const categoria = this.props.categorias.find(categoria => (categoria.id == produto.categoriaId));

        const dimensao = this.props.dimensoes.find(dimensao => (dimensao.id == produto.dimensaoId));

        const material = produto.produtoId && produto.materialId.map(
            (id) => this.props.materiais.find(material => (material.id == id))
        );
        const restricao = produto.produtoId && produto.restricaoId.map(
            (id) => this.props.restricoes.find(restricao => (restricao.id == id))
        );

        return (
            <tr key={produto.id}>
                <td className="produtosTableTdTh">{produto.nome}</td>
                <td className="produtosTableTdTh">{produto.descricao}</td>
                <td className="produtosTableTdTh">{produto.preco}</td>
                <td className="produtosTableTdTh">{categoria && categoria.nome}</td>
                <td className="produtosTableTdTh">{dimensao && dimensao.tipo}</td>
                <td className="produtosTableTdTh">
                    {
                        produtoFilho && produtoFilho.map((produtoFilho) => (
                            <span key={produtoFilho.id}>{produtoFilho.nome}</span>
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
                <td className="produtosTableTdTh"><Button id="editar" onClick={this.handleButtonEditarProduto(produto.id)}>Editar</Button></td>
                <td className="produtosTableTdTh"><Button id="apagar" onClick={this.handleButtonApagarProduto(produto.id)}>Apagar</Button></td>
            </tr>
        );
    }

    handleButtonNovoProduto = () => {
        this.props.history.push(`/produtos/novo`);
    };

    handleButtonEditarProduto = (id) => () => {
        this.props.history.push(`/produtos/editar/${id}`);
    };

    handleButtonApagarProduto = (id) => () => {
        if (window.confirm('Tem a certeza que pretende apagar?')){
            this.props.deleteProduto(id)
        };
    };

    handleClickBackCatalogo = () => {
        this.props.history.push('/configurarcatalogo');
    };
}

Produtos.propTypes = {
    produtos: PropTypes.array,
    categorias: PropTypes.array,
    dimensoes: PropTypes.array,
    materiais: PropTypes.array,
    restricoes: PropTypes.array,
    loading: PropTypes.bool,
    getProduto: PropTypes.func,
    getCategoria: PropTypes.func,
    getDimensao: PropTypes.func,
    getMaterial: PropTypes.func,
    getRestricao: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    const loading = produtoSelectors.isLoading(state) || categoriaSelectors.isLoading(state)
        || dimensaoSelectors.isLoading(state) || materialSelectors.isLoading(state) || restricaoSelectors.isLoading(state);

    return {
        produtos: produtoSelectors.getProdutos(state),
        categorias: categoriaSelectors.getCategorias(state),
        dimensoes: dimensaoSelectors.getDimensoes(state),
        materiais: materialSelectors.getMateriais(state),
        restricoes: restricaoSelectors.getRestricoes(state),
        loading,
    };
};

const mapDispatchToProps = {
    getProduto: produtoActions.getProduto,
    getCategoria: categoriaActions.getCategoria,
    getDimensao: dimensaoActions.getDimensao,
    getMaterial: materialActions.getMaterial,
    getRestricao: restricaoActions.getRestricao,
    deleteProduto: produtoActions.deleteProduto,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(Produtos);
