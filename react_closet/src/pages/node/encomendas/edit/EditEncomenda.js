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
import { actions as itemprodutoActions, selectors as itemprodutoSelectors } from '../../../../shared/state/node/itemproduto';

import '../Encomendas.css';

class EditEncomenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            listaItens: [],
        };
    }

    componentWillMount() {
        this.props.getEncomendas();
        this.props.getItemProdutos();        
    }

    componentWillReceiveProps(nextProps) {
        const { encomenda } = nextProps;

        if (encomenda) {
            this.setState({ ...encomenda });
        } else {
            console.log("error")
        }
    }

    render() {
        const { loading, itemprodutos } = this.props;
        const { nome, listaItens } = this.state;

        return (
            <section className="encomendasWrapper">
                <Typography className="encomendasTitle" variant="h5" align="center">
                    Editar ItemProdutos
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
                            Guardar
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

    handleChangeLargura = (event) => {
        this.setState({ largura: event.target.value });
    };

    handleChangeAltura = (event) => {
        this.setState({ altura: event.target.value });
    };

    handleChangeProfundidade = (event) => {
        this.setState({ profundidade: event.target.value });
    };

    handleChangeListaItens = (event) => {
        this.setState({ listaItens: event.target.value });
    };

    handleChangeLargura = (event) => {
        this.setState({ largura: event.target.value });
    };

    handleButtonSave = () => {
        this.props.editEncomenda(this.state._id, this.state);
        this.redirectToEncomendas();
    };

    handleButtonCancel = () => {
        this.redirectToEncomendas();
    };

    redirectToEncomendas() {
        this.props.history.push(`/encomendas`);
    }
}

EditEncomenda.propTypes = {
    encomenda: PropTypes.object,
    loading: PropTypes.bool,
    itemprodutos: PropTypes.array,
    getEncomendas: PropTypes.func,
    getItemProdutos: PropTypes.func,
    editEncomenda: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state, props) => {
    
    const loading = encomendaSelectors.isLoading(state) || itemprodutoSelectors.isLoading(state);

    return {
        encomenda: encomendaSelectors.getEncomendaById(state, props.match.params.id),
        itemprodutos: itemprodutoSelectors.getItemProdutos(state),
        loading,
    };
};


const mapDispatchToProps = {
    getEncomendas: encomendaActions.getEncomendas,
    getItemProdutos: itemprodutoActions.getItemProdutos,
    editEncomenda: encomendaActions.editEncomenda,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(EditEncomenda);
