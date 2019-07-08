import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { actions, selectors } from '../../shared/state/dimensao';
import { Button } from '@material-ui/core';
import './Dimensoes.css';

class Dimensoes extends Component {
    componentWillMount() {
        this.props.getDimensao();
    }

    render() {
        const { dimensoes, loading } = this.props;

        return (
            <section className="dimensoesWrapper">
                <Typography className="dimensoesTitle" variant="h5" align="center">
                    Lista de Dimensões
                </Typography>
                {loading &&
                    <span>
                        loading...
                    </span>
                }
                {!loading &&
                        <span>
                            <Button id="novo" onClick={this.handleButtonNovaDimensao}>Novo</Button>
                        </span>
                }
                {!loading &&
                    <table className="dimensoesTable">
                        <thead className="dimensoesTableThead">
                            <tr className="dimensoesTableTheadTh">
                                <th className="dimensoesTableTdTh">Nome</th>
                                <th className="dimensoesTableTdTh">Larguma Máxima</th>
                                <th className="dimensoesTableTdTh">Larguma Mínima</th>
                                <th className="dimensoesTableTdTh">Altura Máxima</th>
                                <th className="dimensoesTableTdTh">Altura Mínima</th>
                                <th className="dimensoesTableTdTh">Profundidade Máxima</th>
                                <th className="dimensoesTableTdTh">Profundidade Mínima</th>
                                <th className="dimensoesTableTdTh"></th>
                                <th className="dimensoesTableTdTh"></th>
                            </tr>
                        </thead>
                        <tbody className="dimensoesTableTbodyTd">
                            {dimensoes.map(this.renderDimensao, this)}
                        </tbody>
                    </table>
                }
                <div className="back" onClick={this.handleClickBackCatalogo}>Back</div>
            </section>
        );
    }

    renderDimensao(dimensao) {
        return (
            <tr key={dimensao.id}>
                <td className="dimensoesTableTdTh">{dimensao.tipo}</td>
                <td className="dimensoesTableTdTh">{dimensao.lmax}</td>
                <td className="dimensoesTableTdTh">{dimensao.lmin}</td>
                <td className="dimensoesTableTdTh">{dimensao.amax}</td>
                <td className="dimensoesTableTdTh">{dimensao.amin}</td>
                <td className="dimensoesTableTdTh">{dimensao.pmax}</td>
                <td className="dimensoesTableTdTh">{dimensao.pmin}</td>
                <td className="dimensoesTableTdTh"><Button id="editar" onClick={this.handleButtonEditarDimensao(dimensao.id)}>Editar</Button></td>
                <td className="dimensoesTableTdTh"><Button id="apagar" onClick={this.handleButtonApagarDimensao(dimensao.id)}>Apagar</Button></td>
            </tr>
        );
    }
    handleButtonNovaDimensao = () => {
        this.props.history.push(`/dimensoes/novo`);
    };

    handleButtonEditarDimensao = (id) => () => {
        this.props.history.push(`/dimensoes/editar/${id}`);
    };

    handleButtonApagarDimensao = (id) => () => {
        if (window.confirm('Tem a certeza que pretende apagar?')){
            this.props.deleteDimensao(id)
        };
    };

    handleClickBackCatalogo = () => {
        this.props.history.push('/configurarcatalogo');
    };
}

Dimensoes.propTypes = {
    dimensoes: PropTypes.array,
    loading: PropTypes.bool,
    getDimensao: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    return {
        dimensoes: selectors.getDimensoes(state),
        loading: selectors.isLoading(state),
    };
};

const mapDispatchToProps = {
    getDimensao: actions.getDimensao,
    deleteDimensao: actions.deleteDimensao,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dimensoes);