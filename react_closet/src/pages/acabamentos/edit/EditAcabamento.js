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

import { actions as acabamentoActions, selectors as acabamentoSelectors } from '../../../shared/state/acabamento';

import '../Acabamentos.css';

class EditAcabamento extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
        };
    }

    componentWillMount() {
        this.props.getAcabamento();
    }

    componentWillReceiveProps(nextProps) {
        const { acabamento } = nextProps;

        if (acabamento) {
            this.setState({ ...acabamento });
        }
    }

    render() {
        const { loading } = this.props;
        const { nome } = this.state;

        return (
            <section className="acabamentosWrapper">
                <Typography className="acabamentosTitle" variant="h5" align="center">
                    Editar Acabamentos
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
                            <Input value={nome} onChange={this.handleChangeNome} className="field" />
                        </FormControl>

                        <Button id="save" onClick={this.handleButtonSave}>
                            Guardar
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
        this.setState({ nome: event.target.value });
    };

    handleButtonSave = () => {
        this.props.editAcabamento(this.state.id, this.state);
        this.redirectToAcabamentos();
    };

    handleButtonCancel = () => {
        this.redirectToAcabamentos();
    };

    redirectToAcabamentos() {
        this.props.history.push(`/acabamentos`);
    }
}

EditAcabamento.propTypes = {
    acabamento: PropTypes.object,
    loading: PropTypes.bool,
    getAcabamento: PropTypes.func,
    editAcabamento: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state, props) => {
    const loading = acabamentoSelectors.isLoading(state);

    return {
        acabamento: acabamentoSelectors.getAcabamentoById(state, props.match.params.id),
        acabamentos: acabamentoSelectors.getAcabamentos(state),
        loading,


    };
};

const mapDispatchToProps = {
    getAcabamento: acabamentoActions.getAcabamento,
    editAcabamento: acabamentoActions.editAcabamento,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(EditAcabamento);
