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

import { actions as categoriaActions, selectors as categoriaSelectors } from '../../../shared/state/categoria';

import '../Categorias.css';

class CreateCategoria extends Component {
    constructor(props) {
        super(props);

        this.state={
            nome: '',
            descricao: '',
            categoriaPaiId: 0,
        };
    }

    componentWillMount() {
        this.props.getCategoria();
    }

    render() {
        const { categorias, loading } = this.props;
        const { nome, descricao, categoriaPaiId } = this.state;

        return (
            <section className="categoriasWrapper">
                <Typography className="categoriasTitle" variant="h5" align="center">
                    Criar Categoria
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
                                <Input value={nome} onChange={this.handleChangeNome} className="field"/>
                            </FormControl>

                            <FormControl>
                                <InputLabel className="label">Descrição</InputLabel>
                                <Input value={descricao} onChange={this.handleChangeDescricao} className="field"/>
                            </FormControl>

                            <FormControl>
                                <InputLabel className="label">Categoria Pai</InputLabel>
                                <Select value={categoriaPaiId} onChange={this.handleChangeCategoriaPai} className="field">
                                    { categorias.map((cat) => (
                                            <MenuItem key={cat.id} value={cat.id}>
                                                {cat.nome}
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
        this.setState({nome: event.target.value});
    };


    handleChangeDescricao = (event) => {
        this.setState({descricao: event.target.value});
    };

    handleChangeCategoriaPai = (event) => {
        this.setState({categoriaPaiId: event.target.value});
    };

    handleButtonSave = () => {
        this.props.createCategoria(this.state);
        this.redirectToCategorias();
    };

    handleButtonCancel = () => {
        this.redirectToCategorias();
    };

    redirectToCategorias() {
        this.props.history.push(`/categorias`);
    }
}

CreateCategoria.propTypes = {
    categorias: PropTypes.array,
    loading: PropTypes.bool,
    getCategoria: PropTypes.func,
    createCategoria: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    const loading = categoriaSelectors.isLoading(state);

    return {
        categorias: categoriaSelectors.getCategorias(state),
        loading,
    };
};

const mapDispatchToProps = {
    getCategoria: categoriaActions.getCategoria,
    createCategoria: categoriaActions.createCategoria,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(CreateCategoria);
