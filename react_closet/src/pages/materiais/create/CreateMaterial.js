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

import { actions as materialActions, selectors as materialSelectors } from '../../../shared/state/material';
import { actions as acabamentoActions, selectors as acabamentoSelectors } from '../../../shared/state/acabamento';


import '../Materiais.css';

class CreateMaterial extends Component {
    constructor(props) {
        super(props);

        this.state={
            nome: '',
            acabamentoId: [],
        };
    }

    componentWillMount() {
        this.props.getMaterial();
        this.props.getAcabamento();
    }

    render() {
        const { loading, acabamentos } = this.props;
        const { nome, acabamentoId } = this.state;

        return (
            <section className="materiaisWrapper">
                <Typography className="materiaisTitle" variant="h5" align="center">
                    Criar Material
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
                                <InputLabel className="label">Acabamento</InputLabel>
                                <Select multiple value={acabamentoId} onChange={this.handleChangeAcabamento} className="field">
                                    { acabamentos.map((acabamento) => (
                                            <MenuItem key={acabamento.id} value={acabamento.id}>
                                                {acabamento.nome}
                                            </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button id="save" onClick={this.handleButtonSave}>
                                Criar
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

    handleChangeAcabamento = (event) => {
        this.setState({acabamentoId: event.target.value});
    };

    handleButtonSave = () => {
        this.props.createMaterial(this.state);
        this.redirectToMateriais();
    };

    handleButtonCancel = () => {
        this.redirectToMateriais();
    };

    redirectToMateriais() {
        this.props.history.push(`/materiais`);
    }
}

CreateMaterial.propTypes = {
    materiais: PropTypes.array,
    acabamentos: PropTypes.array,
    loading: PropTypes.bool,
    getMaterial: PropTypes.func,
    getAcabamento: PropTypes.func,
    createMaterial: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    const loading = materialSelectors.isLoading(state) || acabamentoSelectors.isLoading(state);

    return {
        materiais: materialSelectors.getMateriais(state),
        acabamentos: acabamentoSelectors.getAcabamentos(state),
        loading,
    };
};

const mapDispatchToProps = {
    getMaterial: materialActions.getMaterial,
    getAcabamento: acabamentoActions.getAcabamento,
    createMaterial: materialActions.createMaterial,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(CreateMaterial);
