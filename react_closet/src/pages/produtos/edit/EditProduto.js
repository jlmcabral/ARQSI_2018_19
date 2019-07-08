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
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/InputLabel';

import { actions as produtoActions, selectors as produtoSelectors } from '../../../shared/state/produto';
import { actions as categoriaActions, selectors as categoriaSelectors } from '../../../shared/state/categoria';
import { actions as dimensaoActions, selectors as dimensaoSelectors } from '../../../shared/state/dimensao';
import { actions as materialActions, selectors as materialSelectors } from '../../../shared/state/material';
import { actions as restricaoActions, selectors as restricaoSelectors } from '../../../shared/state/restricao';

import '../Produtos.css';

class EditProduto extends Component {
    constructor(props) {
        super(props);

        this.state={
            nome: '',
            descricao: '',
            preco: '',
            obrigatorio: undefined,
            dimensaoId: 0,
            categoriaId: 0,
            produtoId: [],
            materialId: [],
            restricaoId: [],
        };
    }

    componentWillMount() {
        this.props.getProduto();
        this.props.getCategoria();
        this.props.getDimensao();
        this.props.getMaterial();
        this.props.getRestricao();
    }

    componentWillReceiveProps(nextProps){
        const {produto} = nextProps;

        if(produto){
            this.setState({...produto});
        }
    }

    render() {
        const { categorias, dimensoes, loading, materiais, produtos, restricoes } = this.props;
        const {id, nome, categoriaId, dimensaoId, descricao, preco, obrigatorio, produtoId, materialId, restricaoId } = this.state;

        const produtosFilho = produtos.filter((prod) => (prod.id != id));

        return (
            <section className="produtosWrapper">
                <Typography className="produtosTitle" variant="h5" align="center">
                    Editar Produto
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
                                <InputLabel className="label">Preço</InputLabel>
                                <Input value={preco} onChange={this.handleChangePreco} className="field"/>
                            </FormControl>

                            <FormControl>
                                <InputLabel className="label">Categoria</InputLabel>
                                <Select value={categoriaId} onChange={this.handleChangeCategoria} className="field">
                                    { categorias.map((categoria) => (
                                            <MenuItem key={categoria.id} value={categoria.id}>
                                                {categoria.nome}
                                            </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel className="label">Dimensão</InputLabel>
                                <Select value={dimensaoId} onChange={this.handleChangeDimensao} className="field">
                                        { dimensoes.map((dimensao) => (
                                            <MenuItem key={dimensao.id} value={dimensao.id}>
                                                {dimensao.tipo}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel className="label">Produto Filho</InputLabel>
                                <Select multiple value={produtoId} onChange={this.handleChangeProdutoFilho} className="field">
                                        { produtosFilho.map((prod) => (
                                            <MenuItem key={prod.id} value={prod.id}>
                                                {prod.nome}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel className="label">Material</InputLabel>
                                <Select multiple value={materialId} onChange={this.handleChangeMaterial} className="field">
                                        { materiais.map((material) => (
                                            <MenuItem key={material.id} value={material.id}>
                                                {material.nome}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel className="label">Restrição</InputLabel>
                                <Select multiple value={restricaoId} onChange={this.handleChangeRestricao} className="field">
                                        { restricoes.map((restricao) => (
                                            <MenuItem key={restricao.id} value={restricao.id}>
                                                {restricao.nome}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel className="label">Obrigatório</InputLabel>
                                <Checkbox
                                        checked={obrigatorio}
                                        onChange={this.handleChangeObrigatorio}
                                        color="default"
                                    />
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
        this.setState({nome: event.target.value});
    };


    handleChangeDescricao = (event) => {
        this.setState({descricao: event.target.value});
    };

    handleChangePreco = (event) => {
        this.setState({preco: event.target.value});
    };

    handleChangeCategoria = (event) => {
        this.setState({categoriaId: event.target.value});
    };

    handleChangeDimensao = (event) => {
        this.setState({dimensaoId: event.target.value});
    };

    handleChangeObrigatorio = () => {
        const {obrigatorio} = this.state;

        this.setState({obrigatorio: !obrigatorio});
    };

    handleChangeProdutoFilho = (event) => {
        this.setState({produtoId: event.target.value});
    };

    handleChangeRestricao = (event) => {
        this.setState({restricaoId: event.target.value});
    };

    handleChangeMaterial = (event) => {
        this.setState({materialId: event.target.value});
    };

    handleButtonSave = () => {
        this.props.editProduto(this.state.id, this.state);
        this.redirectToProdutos();
    };

    handleButtonCancel = () => {
        this.redirectToProdutos();
    };

    redirectToProdutos() {
        this.props.history.push(`/produtos`);
    }
}

EditProduto.propTypes = {
    produto: PropTypes.object,
    categorias: PropTypes.array,
    dimensoes: PropTypes.array,
    materiais: PropTypes.array,
    restricoes: PropTypes.array,
    loading: PropTypes.bool,
    getCategoria: PropTypes.func,
    getDimensao: PropTypes.func,
    getMaterial: PropTypes.func,
    getRestricao: PropTypes.func,
    getProduto: PropTypes.func,
    editProduto: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state, props) => {
    const loading = produtoSelectors.isLoading(state) || categoriaSelectors.isLoading(state)
            || dimensaoSelectors.isLoading(state) || materialSelectors.isLoading(state) || restricaoSelectors.isLoading(state);

    return {
        produto: produtoSelectors.getProdutoById(state, props.match.params.id),
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
    editProduto: produtoActions.editProduto,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(EditProduto);
