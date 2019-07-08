import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

import Button from '@material-ui/core/Button';

import './SideBar.css';

class SideBar extends Component {
    render() {
        return (
            <aside className="sideBarWrapper">
                <Button id="produtos" onClick={this.handleButtonClick('produtos')}>
                    Produtos
                </Button>
                <Button id="categorias" onClick={this.handleButtonClick('categorias')}>
                    Categorias
                </Button>
                <Button id="dimensoes" onClick={this.handleButtonClick('dimensoes')}>
                    Dimensões
                </Button>
                <Button id="materiais" onClick={this.handleButtonClick('materiais')}>
                    Materiais
                </Button>
                <Button id="acabamentos" onClick={this.handleButtonClick('acabamentos')}>
                    Acabamentos
                </Button>
                <Button id="restricoes" onClick={this.handleButtonClick('restricoes')}>
                    Restrições
                </Button>
                <p>NodeJS:</p>
                <Button id="itemproduto" onClick={this.handleButtonClick('itemproduto')}>
                    ItemProdutos
                </Button>
                <Button id="itemprodutocatalogo" onClick={this.handleButtonClick('itemprodutocatalogo')}>
                    ItemProdutos - catálogo
                </Button>
                <Button id="encomendas" onClick={this.handleButtonClick('encomendas')}>
                    Encomendas
                </Button>
            </aside>
        );
    }

    handleButtonClick = (path) => () => {
        this.props.history.push(`/${path}`);
    };
}

SideBar.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default withRouter(SideBar);
