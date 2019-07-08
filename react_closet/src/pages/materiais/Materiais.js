import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { actions as materialActions, selectors as materialSelectors } from '../../shared/state/material';
import { actions as acabamentoActions , selectors as acabamentoSelectors } from '../../shared/state/acabamento';
import { Button } from '@material-ui/core';
import './Materiais.css';

class Materiais extends Component {
    componentWillMount(){
        this.props.getMaterial();
        this.props.getAcabamento();
    }

    render() {
        const { materiais, loading } = this.props;

        return (
            <section className="materiaisWrapper">
                <Typography className="materiaisTitle" variant="h5" align="center">
                    Lista de Materiais
                </Typography>
                { loading &&
                    <span>
                        loading...
                    </span>
                }
                {!loading &&
                        <span>
                            <Button id="novo" onClick={this.handleButtonNovoMaterial}>Novo</Button>
                        </span>
                }
                { !loading &&
                    <table className="materiaisTable">
                        <thead className="materiaisTableThead">
                            <tr className="materiaisTableTheadTh">
                                <th className="materiaisTableTdTh">Material</th>
                                <th className="materiaisTableTdTh">Acabemento</th>
                                <th className="materiaisTableTdTh"></th>
                                <th className="materiaisTableTdTh"></th>
                            </tr>
                        </thead>
                        <tbody className="materiaisTableTbodyTd">
                            { materiais.map(this.renderMaterial, this) }
                        </tbody>
                    </table>
                }
                <div className="back" onClick={this.handleClickBackCatalogo}>Back</div>
            </section>
        );
    }

    renderMaterial(material){

        const acabamento = material.acabamentoId && material.acabamentoId.map(
            (id) => this.props.acabamentos.find(acabamento => (acabamento.id == id))
        );

        return(
            <tr key={material.id}>
                <td className="materiaisTableTdTh">{ material.nome }</td>
                <td className="materiaisTableTdTh">
                {
                    acabamento && acabamento.map((acabamento) => (
                        acabamento && <span key={acabamento.id}>{acabamento.nome}</span>
                    ))
                }
                </td>
                <td className="materiaisTableTdTh"><Button id="editar" onClick={this.handleButtonEditarMaterial(material.id)}>Editar</Button></td>
                <td className="materiaisTableTdTh"><Button id="apagar" onClick={this.handleButtonApagarMaterial(material.id)}>Apagar</Button></td>
            </tr>
        );
    }

    handleButtonNovoMaterial = () => {
        this.props.history.push(`/materiais/novo`);
    };

    handleButtonEditarMaterial = (id) => () => {
        this.props.history.push(`/materiais/editar/${id}`);
    };

    handleButtonApagarMaterial = (id) => () => {
        if (window.confirm('Tem a certeza que pretende apagar?')){
            this.props.deleteMaterial(id)
        };
    };

    handleClickBackCatalogo = () => {
        this.props.history.push('/configurarcatalogo');
    };
}

Materiais.propTypes = {
    materiais: PropTypes.array,
    acabamentos: PropTypes.array,
    loading: PropTypes.bool,
    getMaterial: PropTypes.func,
    getAcabamento: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    const loading =  materialSelectors.isLoading(state) || acabamentoSelectors.isLoading(state);

    return {
        materiais: materialSelectors.getMateriais(state),
        acabamentos: acabamentoSelectors.getAcabamentos(state),
        loading,
    };
};

const mapDispatchToProps = {
    getMaterial: materialActions.getMaterial,
    getAcabamento: acabamentoActions.getAcabamento,
    deleteMaterial: materialActions.deleteMaterial,
};

export default connect(mapStateToProps, mapDispatchToProps)(Materiais);
