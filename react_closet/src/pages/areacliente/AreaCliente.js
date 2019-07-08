import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import './AreaCliente.css';

class AreaCliente extends Component {
    render() {
        return (
            <div className="homeWrapper clearfix">
                {/* <div className="title">
                    <h2>Configurar cliente!</h2>
                </div> */}

                <div className="cliente-wrapper clearfix">
                    <div className="cliente-item clearfix" onClick={this.handleClickItemProdutos}>
                        <div className="cliente-header">
                            <label>ItemProdutos</label>
                        </div>
                        <div className="cliente-cont">
                            Área de concretização e gestão de ItemProdutos. 
                        </div>
                    </div>
                    <div className="cliente-item clearfix" onClick={this.handleClickCatalogo}>
                        <div className="cliente-header">
                            <label>Catálogo</label>
                        </div>
                        <div className="cliente-cont">
                            Catálogo de ItemProdutos.
                        </div>
                    </div>
                    <div className="cliente-item clearfix" onClick={this.handleClickEncomendas}>
                        <div className="cliente-header">
                            <label>Encomendas</label>
                        </div>
                        <div className="cliente-cont">
                            Área de gestão de Encomendas.
                        </div>
                    </div>
                </div>
                <div className="back" onClick={this.handleClickBackHome}>Back</div>
            </div>
        );
    }
    
    handleClickItemProdutos = () => {
        this.props.history.push('/itemproduto');
    };

    handleClickCatalogo = () => {
        this.props.history.push('/itemprodutocatalogo');
    };
    handleClickEncomendas = () => {
        this.props.history.push('/encomendas');
    };
    
    handleClickBackHome = () => {
        this.props.history.push('/');
    };


}

export default AreaCliente;
