import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import { actions as itemprodutoActions, selectors as itemprodutoSelectors } from '../../../shared/state/node/itemproduto';
import { actions as encomendaActions, selectors as encomendaSelectors } from '../../../shared/state/node/encomenda';

import { Button } from '@material-ui/core';
import './Encomendas.css';

class Encomendas extends Component {
    componentWillMount() {
        this.props.getEncomendas();
        this.props.getItemProdutos();

    }

    render() {
        const { encomendas, loading } = this.props;

        return (
            <section className="encomendasWrapper">
                <Typography className="encomendasTitle" variant="h5" align="center">
                    Lista de Encomendas
                </Typography>
                {loading &&
                    <span>
                        loading...
                    </span>
                }
                {!loading &&
                    <span>
                        <Button id="nova" onClick={this.handleButtonNovaEncomenda}>Nova</Button>
                    </span>
                }
                {!loading &&
                    <table className="encomendasTable">
                        <thead className="encomendasTableThead">
                            <tr className="encomendasTableTheadTh">
                                <th className="encomendasTableTdTh">Nome</th>
                                <th className="encomendasTableTdTh">Lista de Itens</th>
                                <th className="encomendasTableTdTh"></th>
                                <th className="encomendasTableTdTh"></th>
                            </tr>
                        </thead>
                        <tbody className="encomendasTableTbodyTd">
                            {encomendas.map(this.renderEncomenda, this)}
                        </tbody>
                    </table>

                }
                <div className="back" onClick={this.handleClickBackAreaCliente}>Back</div>
            </section>
        );
    }

    renderEncomenda(encomenda) {

        const itemproduto = encomenda.listaItens && encomenda.listaItens.map(
            (_id) => this.props.itemprodutos.find(itemproduto => (itemproduto._id == _id))
        );

        return (
            <tr key={encomenda._id}>
                <td className="encomendasTableTdTh">{encomenda.nome}</td>
                <td className="encomendasTableTdTh">
                    {
                        itemproduto && itemproduto.map((itemproduto) => (
                            itemproduto && <span key={itemproduto._id}>{itemproduto.nome}</span>
                        ))
                    }
                </td>
                <td className="encomendasTableTdTh"><Button id="editar" onClick={this.handleButtonEditarEncomenda(encomenda._id)}>Editar</Button></td>
                <td className="encomendasTableTdTh"><Button id="apagar" onClick={this.handleButtonApagarEncomenda(encomenda._id)}>Apagar</Button></td>
            </tr>
        );
    }

    handleButtonNovaEncomenda = () => {
        this.props.history.push(`/encomendas/novo`);
    };

    handleButtonEditarEncomenda = (_id) => () => {
        this.props.history.push(`/encomendas/editar/${_id}`);
    };

    handleButtonApagarEncomenda = (_id) => () => {
        if (window.confirm('Tem a certeza que pretende apagar?')) {
            this.props.deleteEncomenda(_id)
        };
    };

    handleClickBackAreaCliente = () => {
        this.props.history.push('/areacliente');
    };
}

Encomendas.propTypes = {
    encomendas: PropTypes.array,
    itemprodutos: PropTypes.array,
    loading: PropTypes.bool,
    getEncomendas: PropTypes.func,
    getItemProdutos: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    const loading = itemprodutoSelectors.isLoading(state) || encomendaSelectors.isLoading(state);

    return {
        encomendas: encomendaSelectors.getEncomendas(state),
        itemprodutos: itemprodutoSelectors.getItemProdutos(state),
        loading,
    };
};

const mapDispatchToProps = {
    getEncomendas: encomendaActions.getEncomendas,
    deleteEncomenda: encomendaActions.deleteEncomenda,
    getItemProdutos: itemprodutoActions.getItemProdutos,

};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(Encomendas);
