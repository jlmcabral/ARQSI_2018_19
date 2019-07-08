import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Typography from '@material-ui/core/Typography';
import { actions, selectors } from '../../shared/state/restricao';
import { Button } from '@material-ui/core';
import './Restricoes.css';

class Restricoes extends Component {
    componentWillMount() {
        this.props.getRestricao();
    }

    render() {
        const { restricoes, loading } = this.props;

        return (
            <section className="restricoesWrapper">
                <Typography className="restricoesTitle" variant="h5" align="center">
                    Lista de Restrições
                </Typography>
                {loading &&
                    <span>
                        loading...
                    </span>
                }
                {!loading &&
                        <span>
                            <Button id="novo" onClick={this.handleButtonNovaRestricao}>Novo</Button>
                        </span>
                }
                {!loading &&
                    <table className="restricoesTable">
                        <thead className="restricoesTableThead">
                            <tr className="restricoesTableTheadTh">
                                <th className="restricoesTableTdTh">Nome</th>
                                <th className="restricoesTableTdTh"></th>
                                <th className="restricoesTableTdTh"></th>
                            </tr>
                        </thead>
                        <tbody className="restricoesTableTbodyTd">
                            {restricoes.map(this.renderRestricao, this)}
                        </tbody>
                    </table>
                }
                <div className="back" onClick={this.handleClickBackCatalogo}>Back</div>
            </section>
        );
    }

    renderRestricao(restricao) {
        return (
            <tr key={restricao.id}>
                <td className="restricoesTableTdTh">{restricao.nome}</td>
                <td className="restricoesTableTdTh"><Button id="editar" onClick={this.handleButtonEditarRestricao(restricao.id)}>Editar</Button></td>
                <td className="restricoesTableTdTh"><Button id="apagar" onClick={this.handleButtonApagarRestricao(restricao.id)}>Apagar</Button></td>
            </tr>
        );
    }

    handleButtonNovaRestricao = () => {
        this.props.history.push(`/restricoes/novo`);
    };

    handleButtonEditarRestricao = (id) => () => {
        this.props.history.push(`/restricoes/editar/${id}`);
    };

    handleButtonApagarRestricao = (id) => () => {
        if (window.confirm('Tem a certeza que pretende apagar?')){
            this.props.deleteRestricao(id)
        };
    };

    handleClickBackCatalogo = () => {
        this.props.history.push('/configurarcatalogo');
    };
}

Restricoes.propTypes = {
    restricoes: PropTypes.array,
    loading: PropTypes.bool,
    getRestricao: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    return {
        restricoes: selectors.getRestricoes(state),
        loading: selectors.isLoading(state),
    };
};

const mapDispatchToProps = {
    getRestricao: actions.getRestricao,
    deleteRestricao: actions.deleteRestricao,

};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(Restricoes);
