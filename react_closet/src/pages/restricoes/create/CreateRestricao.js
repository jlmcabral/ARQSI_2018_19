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

import { actions as restricaoActions, selectors as restricaoSelectors } from '../../../shared/state/restricao';

import '../Restricoes.css';

class CreateRestricao extends Component {
    constructor(props) {
        super(props);

        this.state={
            nome: '',
        };
    }

    componentWillMount() {
        this.props.getRestricao();
    }

    render() {
        const { loading } = this.props;
        const { nome } = this.state;

        return (
            <section className="restricoesWrapper">
                <Typography className="restricoesTitle" variant="h5" align="center">
                    Criar Restrição
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

    handleButtonSave = () => {
        this.props.createRestricao(this.state);
        this.redirectToRestricoes();
    };

    handleButtonCancel = () => {
        this.redirectToRestricoes();
    };

    redirectToRestricoes() {
        this.props.history.push(`/restricoes`);
    }
}

CreateRestricao.propTypes = {
    restricoes: PropTypes.array,
    loading: PropTypes.bool,
    getRestricao: PropTypes.func,
    createRestricao: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state) => {
    const loading = restricaoSelectors.isLoading(state);

    return {
        restricoes: restricaoSelectors.getRestricoes(state),
        loading,
    };
};

const mapDispatchToProps = {
    getRestricao: restricaoActions.getRestricao,
    createRestricao: restricaoActions.createRestricao,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(CreateRestricao);

