import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="homeWrapper clearfix">
                <div className="title">
                    <h2>Bem Vindo a Closet Isep Encomendas!</h2>
                </div>

                <div className="menu-wrapper clearfix">
                    <div className="menu-item clearfix" onClick={this.handleClickCatalogo}>
                        <div className="menu-header">
                            <label>Configurador de catálogo</label>
                        </div>
                        <div className="menu-cont">
                            Esta área permite aceder aos menu de configuração de catálogo.<br/> <br/>
                            Aqui é possível fazer ações CRUD nos Produtos, Categorias, Dimensões, Materiais, Acabamantos e Restrições. 
                        </div>
                    </div>
                    <div className="menu-item clearfix" onClick={this.handleClickCliente}>
                        <div className="menu-header">
                            <label>Cliente</label>
                        </div>
                        <div className="menu-cont">
                            Esta área permite aceder à área de cliente.<br/><br/>
                            
                            Aqui é possível concretizar produtos e gerir encomendas.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    handleClickCatalogo = () => {
        this.props.history.push('/configurarcatalogo');
    };

    handleClickCliente = () => {
        this.props.history.push('/areacliente');
    };
}

export default Home;
