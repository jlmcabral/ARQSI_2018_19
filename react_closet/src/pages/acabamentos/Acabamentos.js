import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import { actions, selectors } from '../../shared/state/acabamento';
import { Button } from '@material-ui/core';
import './Acabamentos.css';

class Acabamentos extends Component {
    componentWillMount() {
        this.props.getAcabamento();
    }

    render() {
        const { acabamentos, loading } = this.props;

        return (
            <section className="acabamentosWrapper">
                <Typography className="acabamentosTitle" variant="h5" align="center">
                    Lista de Acabamentos
                </Typography>
                {loading &&
                    <span>
                        loading...
                    </span>
                }
                {!loading &&
                        <span>
                            <Button id="novo" onClick={this.handleButtonNovoAcabamento}>Novo</Button>
                        </span>
                }
                {!loading &&
                    <table className="acabamentosTable">
                        <thead className="acabamentosTableThead">
                            <tr className="acabamentosTableTheadTh">
                                <th className="acabamentosTableTdTh">Nome</th>
                                <th className="acabamentosTableTdTh"></th>
                                <th className="acabamentosTableTdTh"></th>
                            </tr>
                        </thead>
                        <tbody className="acabamentosTableTbodyTd">
                            {acabamentos.map(this.renderAcabamento, this)}
                        </tbody>
                    </table>

                }
            <div className="back" onClick={this.handleClickBackCatalogo}>Back</div> 

            </section>
        );
    }

    renderAcabamento(acabamento) {
        return (
            <tr key={acabamento.id}>
                <td className="acabamentosTableTdTh">{acabamento.nome}</td>
                <td className="acabamentosTableTdTh"><Button id="editar" onClick={this.handleButtonEditarAcabamento(acabamento.id)}>Editar</Button></td>
                <td className="acabamentosTableTdTh"><Button id="apagar" onClick={this.handleButtonApagarAcabamento(acabamento.id)}>Apagar</Button></td>
            </tr>
        );
    }
    handleButtonNovoAcabamento = () => {
        this.props.history.push(`/acabamentos/novo`);
    };

    handleButtonEditarAcabamento = (id) => () => {
        this.props.history.push(`/acabamentos/editar/${id}`);
    };

    handleButtonApagarAcabamento = (id) => () => {
        if (window.confirm('Tem a certeza que pretende apagar?')){
            this.props.deleteAcabamento(id)
        };
    };

    handleClickBackCatalogo = () => {
        this.props.history.push('/configurarcatalogo');
    };
}

Acabamentos.propTypes = {
    acabamentos: PropTypes.array,
    loading: PropTypes.bool,
    getAcabamento: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    return {
        acabamentos: selectors.getAcabamentos(state),
        loading: selectors.isLoading(state),
    };
};

const mapDispatchToProps = {
    getAcabamento: actions.getAcabamento,
    deleteAcabamento: actions.deleteAcabamento,
    
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(Acabamentos);
