import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import { actions, selectors } from '../../shared/state/categoria';
import { Button } from '@material-ui/core';
import './Categorias.css';

class Categorias extends Component {
    componentWillMount() {
        this.props.getCategoria();
    }

    render() {
        const { categorias, loading } = this.props;

        return (
            <section className="categoriasWrapper">
                <Typography className="categoriasTitle" variant="h5" align="center">
                    Lista de Categorias
                </Typography>
                {loading &&
                    <span>
                        loading...
                    </span>
                }
                {!loading &&
                    <span>
                        <Button id="novo" onClick={this.handleButtonNovaCategoria}>Novo</Button>
                    </span>
                }
                {!loading &&
                    <table className="categoriasTable">
                        <thead className="categoriasTableThead">
                            <tr className="categoriasTableTheadTh">
                                <th className="categoriasTableTdTh">Nome</th>
                                <th className="categoriasTableTdTh">Descrição</th>
                                <th className="categoriasTableTdTh">Categoria Pai</th>
                                <th className="categoriasTableTdTh"></th>
                                <th className="categoriasTableTdTh"></th>
                            </tr>
                        </thead>
                        <tbody className="categoriasTableTbodyTd">
                            {categorias.map(this.renderCategoria, this)}
                        </tbody>
                    </table>
                }
                <div className="back" onClick={this.handleClickBackCatalogo}>Back</div>
            </section>
        );
    }

    renderCategoria(categoria) {

        return (
            <tr key={categoria.id}>
                <td className="categoriasTableTdTh">{categoria.nome}</td>
                <td className="categoriasTableTdTh">{categoria.descricao}</td>
                <td className="categoriasTableTdTh">{categoria.categoriaPai && categoria.categoriaPai.nome}</td>
                <td className="categoriasTableTdTh"><Button id="editar" onClick={this.handleButtonEditarCategoria(categoria.id)}>Editar</Button></td>
                <td className="categoriasTableTdTh"><Button id="apagar" onClick={this.handleButtonApagarCategoria(categoria.id)}>Apagar</Button></td>
            </tr>
        );
    }

    handleButtonNovaCategoria = () => {
        this.props.history.push(`/categorias/novo`);
    };

    handleButtonEditarCategoria = (id) => () => {
        this.props.history.push(`/categorias/editar/${id}`);
    };

    handleButtonApagarCategoria = (id) => () => {
        if (window.confirm('Tem a certeza que pretende apagar?')) {
            this.props.deleteCategoria(id)
        };
    };

    handleClickBackCatalogo = () => {
        this.props.history.push('/configurarcatalogo');
    };
}

Categorias.propTypes = {
    categorias: PropTypes.array,
    loading: PropTypes.bool,
    getCategoria: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    return {
        categorias: selectors.getCategorias(state),
        loading: selectors.isLoading(state),
    };
};

const mapDispatchToProps = {
    getCategoria: actions.getCategoria,
    deleteCategoria: actions.deleteCategoria,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(Categorias);