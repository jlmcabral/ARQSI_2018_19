import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/InputLabel';

import { actions as encomendaActions, selectors as encomendaSelectors } from '../../../../shared/state/node/encomenda';
import { actions as itemProdutoActions, selectors as itemProdutoSelectors } from '../../../../shared/state/node/itemproduto';

import '../Encomendas.css';

class CreateEncomenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            listaItens: [],
        };
    }

    componentDidMount() {
        this.props.getEncomendas();
        this.props.getItemProdutos();
    }

    render() {
        const { loading, itemprodutos } = this.props;
        const { nome, listaItens } = this.state;

        return (
            <section className="encomendasWrapper">
                <Typography className="encomendasTitle" variant="h5" align="center">
                    Criar Encomendas
                </Typography>
                {loading &&
                    <span>
                        loading...
                    </span>
                }
                {!loading &&
                    <Fragment>

                        <FormControl>
                            <InputLabel className="label">Nome</InputLabel>
                            <Input value={nome} onChange={this.handleChangeNome} className="field" />
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">listaItem</InputLabel>
                            <Select multiple value={listaItens} onChange={this.handleChangeListaItens} className="field">
                                {itemprodutos.map((prod) => (
                                    <MenuItem key={prod._id} value={prod._id}>
                                        {prod.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button id="save" onClick={this.handleButtonSave}>
                            Criar
                            </Button>
                        <Button id="edicanceltar" onClick={this.handleButtonCancel}>
                            Cancelar
                            </Button>
                    </Fragment>
                }
            </section>
        );
    }

    handleChangeNome = (event) => {
        this.setState({ nome: event.target.value });
    };


    handleChangeListaItens = (event) => {
        this.setState({ listaItens: event.target.value });
    };

    handleButtonSave = () => {
        this.props.createEncomenda(this.state);
        this.redirectToEncomendas();
    };

    handleButtonCancel = () => {
        this.redirectToEncomendas();
    };

    redirectToEncomendas() {
        this.props.history.push(`/encomendas`);
    }
}

CreateEncomenda.propTypes = {
    encomendas: PropTypes.array,
    loading: PropTypes.bool,
    getEncomendas: PropTypes.func,
    createEncomenda: PropTypes.func,
    getItemProdutos: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    const loading = encomendaSelectors.isLoading(state);

    return {
        encomendas: encomendaSelectors.getEncomendas(state),
        itemprodutos: itemProdutoSelectors.getItemProdutos(state),
        loading,
    };
};

const mapDispatchToProps = {
    getItemProdutos: itemProdutoActions.getItemProdutos,
    getEncomendas: encomendaActions.getEncomendas,
    createEncomenda: encomendaActions.createEncomenda,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(CreateEncomenda);