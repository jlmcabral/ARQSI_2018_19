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

class EditRestricao extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
        };
    }

    componentWillMount() {
        this.props.getRestricao();
    }

    componentWillReceiveProps(nextProps) {
        const { restricao } = nextProps;

        if (restricao) {
            this.setState({ ...restricao });
        }
    }

    render() {
        const { loading } = this.props;
        const { nome } = this.state;

        return (
            <section className="restricoesWrapper">
                <Typography className="restricoesTitle" variant="h5" align="center">
                    Editar Restrições
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
        this.props.editRestricao(this.state.id, this.state);
        this.redirectToRestricoes();
    };

    handleButtonCancel = () => {
        this.redirectToRestricoes();
    };

    redirectToRestricoes() {
        this.props.history.push(`/restricoes`);
    }
}

EditRestricao.propTypes = {
    restricao: PropTypes.object,
    loading: PropTypes.bool,
    getRestricao: PropTypes.func,
    editRestricao: PropTypes.func,
    history: PropTypes.shape({ push: PropTypes.func, }),
};

const mapStateToProps = (state, props) => {
    const loading = restricaoSelectors.isLoading(state);

    return {
        restricao: restricaoSelectors.getRestricaoById(state, props.match.params.id),
        restricoes: restricaoSelectors.getRestricoes(state),
        loading,


    };
};

const mapDispatchToProps = {
    getRestricao: restricaoActions.getRestricao,
    editRestricao: restricaoActions.editRestricao,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
);

export default enhance(EditRestricao);
