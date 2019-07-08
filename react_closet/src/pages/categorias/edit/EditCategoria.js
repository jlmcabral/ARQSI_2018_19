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

class EditCategoria extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            descricao: '',
            categoriaPaiId: 0,
        };
    }

    componentWillMount() {
        this.props.getCategoria();
    }

    componentWillReceiveProps(nextProps) {
        const { categoria } = nextProps;

        if (categoria) {
            this.setState({ ...categoria });
        }
    }

    render() {
        const { categorias, loading } = this.props;
        const { id, nome, descricao, categoriaPaiId } = this.state;

        const categoriasPai = categorias.filter((cat) => (cat.id != id));

        return (
            <section className="categoriasWrapper">
                <Typography className="categoriasTitle" variant="h5" align="center">
                    Editar Categoria
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
                            <InputLabel className="label">Descrição</InputLabel>
                            <Input value={descricao} onChange={this.handleChangeDescricao} className="field" />
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">Categoria Pai</InputLabel>
                            <Select value={categoriaPaiId} onChange={this.handleChangeCategoriaPai} className="field">
                                {categoriasPai.map((catPai) => (
                                    <MenuItem key={catPai.id} value={catPai.id}>
                                        {catPai.nome}
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


    handleChangeDescricao = (event) => {
        this.setState({ descricao: event.target.value });
    };

    handleChangeCategoriaPai = (event) => {
        this.setState({ categoriaPaiId: event.target.value });
    };

    handleButtonSave = () => {
        console.log(this.state)
        this.props.editCategoria(this.state.id, this.state);
        this.redirectToCategorias();
    };

    handleButtonCancel = () => {
        this.redirectToCategorias();
    };

    redirectToCategorias() {
        this.props.history.push(`/categorias`);
    }
}

EditCategoria.propTypes = {
    categorias: PropTypes.array,
    loading: PropTypes.bool,
    getCategoria: PropTypes.func,
    editCategoria: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state, props) => {
    const loading = categoriaSelectors.isLoading(state);

    return {
        categoria: categoriaSelectors.getCategoriaById(state, props.match.params.id),
        categorias: categoriaSelectors.getCategorias(state),
        loading,
    };
};

const mapDispatchToProps = {
    getCategoria: categoriaActions.getCategoria,
    editCategoria: categoriaActions.editCategoria,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(EditCategoria);
