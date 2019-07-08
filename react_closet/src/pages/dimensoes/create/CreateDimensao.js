import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/InputLabel';

import { actions as dimensaoActions, selectors as dimensaoSelectors } from '../../../shared/state/dimensao';

import '../Dimensoes.css';

class CreateDimensao extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tipo: '',
            lmax: '',
            lmin: '',
            amax: '',
            amin: '',
            pmax: '',
            pmin: ''
        };
    }

    componentWillMount() {
        this.props.getDimensao();
    }

    render() {
        const { loading } = this.props;
        const { tipo, lmax, lmin, amax, amin, pmax, pmin } = this.state;

        return (
            <section className="dimensoesWrapper">
                <Typography className="dimensoesTitle" variant="h5" align="center">
                    Criar Dimensão
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
                            <Input value={tipo} onChange={this.handleChangeNome} className="field" />
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">Largura máxima</InputLabel>
                            <Input value={lmax} onChange={this.handleChangeLmax} className="field" />
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">Largura mínima</InputLabel>
                            <Input value={lmin} onChange={this.handleChangeLmin} className="field" />
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">Altura máxima</InputLabel>
                            <Input value={amax} onChange={this.handleChangeAmax} className="field" />
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">Altura mínima</InputLabel>
                            <Input value={amin} onChange={this.handleChangeAmin} className="field" />
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">Profundidade máxima</InputLabel>
                            <Input value={pmax} onChange={this.handleChangePmax} className="field" />
                        </FormControl>

                        <FormControl>
                            <InputLabel className="label">Profundidade mínima</InputLabel>
                            <Input value={pmin} onChange={this.handleChangePmin} className="field" />
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
        this.setState({ tipo: event.target.value });
    };

    handleChangeLmax = (event) => {
        this.setState({lmax: event.target.value});
    };
    
    handleChangeLmin = (event) => {
        this.setState({lmin: event.target.value});
    };

    handleChangeAmax = (event) => {
        this.setState({amax: event.target.value});
    };

    handleChangeAmin = (event) => {
        this.setState({amin: event.target.value});
    };

    handleChangePmax = (event) => {
        this.setState({pmax: event.target.value});
    };

    handleChangePmin = (event) => {
        this.setState({pmin: event.target.value});
    };

    handleButtonSave = () => {
        this.props.createDimensao(this.state);
        this.redirectToDimensoes();
    };

    handleButtonCancel = () => {
        this.redirectToDimensoes();
    };

    redirectToDimensoes() {
        this.props.history.push(`/dimensoes`);
    }
}

CreateDimensao.propTypes = {
    dimensao: PropTypes.object,
    loading: PropTypes.bool,
    getDimensao: PropTypes.func,
    editDimensao: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    const loading = dimensaoSelectors.isLoading(state);

    return {
        dimensoes: dimensaoSelectors.getDimensoes(state),
        loading,


    };
};

const mapDispatchToProps = {
    getDimensao: dimensaoActions.getDimensao,
    createDimensao: dimensaoActions.createDimensao,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(CreateDimensao);