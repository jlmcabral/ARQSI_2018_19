import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import './ConfigurarCatalogo.css';

class ConfigurarCatalogo extends Component {
    render() {
        return (
            <div className="homeWrapper clearfix">
                {/* <div className="title">
                    <h2>Configurar catalogo!</h2>
                </div> */}

                <div className="catalogo-wrapper clearfix">
                    <div className="catalogo-item clearfix" onClick={this.handleClickProdutos}>
                        <div className="catalogo-header">
                            <label>Produtos</label>
                        </div>
                        <div className="catalogo-cont">
                            Área de gestão de Produtos. 
                        </div>
                    </div>
                    <div className="catalogo-item clearfix" onClick={this.handleClickCategorias}>
                        <div className="catalogo-header">
                            <label>Categorias</label>
                        </div>
                        <div className="catalogo-cont">
                            Área de gestão de Categorias.
                        </div>
                    </div>
                    <div className="catalogo-item clearfix" onClick={this.handleClickDimensoes}>
                        <div className="catalogo-header">
                            <label>Dimensões</label>
                        </div>
                        <div className="catalogo-cont">
                            Área de gestão de Dimensões.
                        </div>
                    </div>
                    <div className="catalogo-item clearfix" onClick={this.handleClickMateriais}>
                        <div className="catalogo-header">
                            <label>Materiais</label>
                        </div>
                        <div className="catalogo-cont">
                            Área de gestão de Materiais.
                        </div>
                    </div>
                    <div className="catalogo-item clearfix" onClick={this.handleClickAcabamentos}>
                        <div className="catalogo-header">
                            <label>Acabamentos</label>
                        </div>
                        <div className="catalogo-cont">
                            Área de gestão de Acabamentos.
                        </div>
                    </div>
                    <div className="catalogo-item clearfix" onClick={this.handleClickRestricoes}>
                        <div className="catalogo-header">
                            <label>Restrições</label>
                        </div>
                        <div className="catalogo-cont">
                            Área de gestão de Restrições.
                        </div>
                    </div>
                </div>
                <div className="back" onClick={this.handleClickBackHome}>Back</div>
            </div>
        );
    }
    
    handleClickProdutos = () => {
        this.props.history.push('/produtos');
    };

    handleClickCategorias = () => {
        this.props.history.push('/categorias');
    };
    handleClickDimensoes = () => {
        this.props.history.push('/dimensoes');
    };
    handleClickMateriais = () => {
        this.props.history.push('/materiais');
    };
    handleClickAcabamentos = () => {
        this.props.history.push('/acabamentos');
    };
    handleClickRestricoes = () => {
        this.props.history.push('/restricoes');
    };
    handleClickBackHome = () => {
        this.props.history.push('/');
    };


}

export default ConfigurarCatalogo;
