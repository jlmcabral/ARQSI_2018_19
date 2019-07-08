import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import { actions, selectors } from '../../../shared/state/node/itemproduto';
import { actions as produtoActions, selectors as produtoSelectors } from '../../../shared/state/produto';

import { Button } from '@material-ui/core';
import './ItemProdutos.css';

class ItemProdutos extends Component {
    componentWillMount() {
        this.props.getItemProdutos();
        this.props.getProduto();
    }

    render() {
        const { itemProdutos, loading } = this.props;

        return (
            <section className="itemProdutosWrapper">
                <Typography className="itemProdutosTitle" variant="h5" align="center">
                    Lista de ItemProdutos
                </Typography>
                {loading &&
                    <span>
                        loading...
                    </span>
                }
                {!loading &&
                    <span>
                        <Button id="novo" onClick={this.handleButtonNovoItemProduto}>Novo</Button>
                    </span>
                }
                {!loading &&
                    <table className="itemProdutosTable">
                        <thead className="itemProdutosTableThead">
                            <tr className="itemProdutosTableTheadTh">
                                <th className="itemProdutosTableTdTh">Nome</th>
                                <th className="itemProdutosTableTdTh">Largura</th>
                                <th className="itemProdutosTableTdTh">Altura</th>
                                <th className="itemProdutosTableTdTh">Profundidade</th>
                                <th className="itemProdutosTableTdTh">Produto</th>
                                <th className="itemProdutosTableTdTh">Items</th>
                                <th className="itemProdutosTableTdTh"></th>
                                <th className="itemProdutosTableTdTh"></th>
                            </tr>
                        </thead>
                        <tbody className="itemProdutosTableTbodyTd">
                            {itemProdutos.map(this.renderItemProduto, this)}
                        </tbody>
                    </table>
                }
                <div className="back" onClick={this.handleClickBackAreaCliente}>Back</div>
            </section>
        );
    }

    renderItemProduto(itemproduto) {

        const produto = this.props.produtos.find(produto => (produto.id == itemproduto.produtoId));

        const produtoFilho = itemproduto.item && itemproduto.item.map(
            (id) => this.props.produtos.find(produtoFilho => (produtoFilho.id == id))
        );


        return (
            <tr key={itemproduto._id}>
                <td className="itemProdutosTableTdTh">{itemproduto.nome}</td>
                <td className="itemProdutosTableTdTh">{itemproduto.largura}</td>
                <td className="itemProdutosTableTdTh">{itemproduto.altura}</td>
                <td className="itemProdutosTableTdTh">{itemproduto.profundidade}</td>
                <td className="itemProdutosTableTdTh">
                    {/* <p> {itemproduto.produtoId}</p> */}
                    <p>{produto && produto.nome}</p>
                </td>
                <td className="itemProdutosTableTdTh">
                    {
                        produtoFilho && produtoFilho.map((produtoFilho) => (
                            <span key={produtoFilho.id}>{produtoFilho.nome}</span>
                        ))
                    }
                </td>
                <td className="itemProdutosTableTdTh"><Button id="editar" onClick={this.handleButtonEditarItemProduto(itemproduto._id)}>Editar</Button></td>
                <td className="itemProdutosTableTdTh"><Button id="apagar" onClick={this.handleButtonApagarItemProduto(itemproduto._id)}>Apagar</Button></td>
            </tr>
        );
    }
    handleButtonNovoItemProduto = () => {
        this.props.history.push(`/itemproduto/novo`);
    };

    handleButtonEditarItemProduto = (_id) => () => {
        this.props.history.push(`/itemproduto/editar/${_id}`);
    };

    handleButtonApagarItemProduto = (_id) => () => {
        if (window.confirm('Tem a certeza que pretende apagar?')) {
            this.props.deleteItemProduto(_id)
        };
    };

    handleClickBackAreaCliente = () => {
        this.props.history.push('/areacliente');
    };
}

ItemProdutos.propTypes = {
    itemProdutos: PropTypes.array,
    produtos: PropTypes.array,
    loading: PropTypes.bool,
    getItemProdutos: PropTypes.func,
    getProduto: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    return {
        produtos: produtoSelectors.getProdutos(state),
        itemProdutos: selectors.getItemProdutos(state),
        loading: selectors.isLoading(state),
    };
};

const mapDispatchToProps = {
    getItemProdutos: actions.getItemProdutos,
    deleteItemProduto: actions.deleteItemProduto,
    getProduto: produtoActions.getProduto,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(ItemProdutos);
