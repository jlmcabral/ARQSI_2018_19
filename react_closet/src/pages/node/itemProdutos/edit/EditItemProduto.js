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

import { actions as itemprodutoActions, selectors as itemprodutoSelectors } from '../../../../shared/state/node/itemproduto';
import { actions as produtoActions, selectors as produtoSelectors } from '../../../../shared/state/produto';

import '../ItemProdutos.css';

class EditItemProduto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            largura: '',
            altura: '',
            profundidade: '',
            produtoId: 0,
            item: [],
        };
    }

    componentWillMount() {
        this.props.getItemProdutos();
        this.props.getProduto();        
    }

    componentWillReceiveProps(nextProps) {
        const { itemproduto } = nextProps;

        if (itemproduto) {
            this.setState({ ...itemproduto });
        } else {
            console.log("error")
        }
    }

    render() {
        const { loading, produtos } = this.props;
        const { nome, largura, altura, profundidade, produtoId, item } = this.state;

        const produtosFilho = produtos.filter((prod) => (prod.id == produtoId));
        const itemsId = produtosFilho.map((prod) => prod.produtoId);

        const items = produtos.filter((prod) => (prod.id == itemsId));
        
        return (
            <section className="itemProdutosWrapper">
                <Typography className="itemProdutosTitle" variant="h5" align="center">
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
                            <InputLabel className="label">Largura</InputLabel>
                            <Input value={largura} onChange={this.handleChangeLargura} className="field" />
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">Altura</InputLabel>
                            <Input value={altura} onChange={this.handleChangeAltura} className="field" />
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">Produndidade</InputLabel>
                            <Input value={profundidade} onChange={this.handleChangeProfundidade} className="field" />
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">Produto</InputLabel>
                            <Select value={produtoId} onChange={this.handleChangeProdutoFilho} className="field">
                                {produtos.map((prod) => (
                                    <MenuItem key={prod.id} value={prod.id}>
                                        {prod.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">Items</InputLabel>
                            <Select multiple value={item} onChange={this.handleChangeItem} className="field">
                                {items.map((prod) => (
                                    <MenuItem key={prod.produtoId} value={prod.nome}>
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

    handleChangeLargura = (event) => {
        this.setState({ largura: event.target.value });
    };

    handleChangeProdutoFilho = (event) => {
        this.setState({ produtoId: event.target.value });
    };

    handleChangeItem = (event) => {
        this.setState({ item: event.target.value })
    };

    handleButtonSave = () => {
        this.props.editItemProduto(this.state._id, this.state);
        this.redirectToItemProdutos();
    };

    handleButtonCancel = () => {
        this.redirectToItemProdutos();
    };

    redirectToItemProdutos() {
        this.props.history.push(`/itemproduto`);
    }
}

EditItemProduto.propTypes = {
    itemproduto: PropTypes.object,
    loading: PropTypes.bool,
    getItemProdutos: PropTypes.func,
    editItemProduto: PropTypes.func,
    getProduto: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state, props) => {
    
    const loading = itemprodutoSelectors.isLoading(state);

    return {
        itemproduto: itemprodutoSelectors.getItemProdutoById(state, props.match.params.id),
        produtos: produtoSelectors.getProdutos(state),
        itemProdutos: itemprodutoSelectors.getItemProdutos(state),
        loading,
    };
};

const mapDispatchToProps = {
    getProduto: produtoActions.getProduto,
    getItemProdutos: itemprodutoActions.getItemProdutos,
    editItemProduto: itemprodutoActions.editItemProduto,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(EditItemProduto);
