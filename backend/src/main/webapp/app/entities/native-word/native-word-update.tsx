import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './native-word.reducer';
import { INativeWord } from 'app/shared/model/native-word.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INativeWordUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INativeWordUpdateState {
  isNew: boolean;
}

export class NativeWordUpdate extends React.Component<INativeWordUpdateProps, INativeWordUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { nativeWordEntity } = this.props;
      const entity = {
        ...nativeWordEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/native-word');
  };

  render() {
    const { nativeWordEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="backendApp.nativeWord.home.createOrEditLabel">
              <Translate contentKey="backendApp.nativeWord.home.createOrEditLabel">Create or edit a NativeWord</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : nativeWordEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="native-word-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="wordLabel" for="word">
                    <Translate contentKey="backendApp.nativeWord.word">Word</Translate>
                  </Label>
                  <AvField id="native-word-word" type="text" name="word" />
                </AvGroup>
                <AvGroup>
                  <Label id="langLabel">
                    <Translate contentKey="backendApp.nativeWord.lang">Lang</Translate>
                  </Label>
                  <AvInput
                    id="native-word-lang"
                    type="select"
                    className="form-control"
                    name="lang"
                    value={(!isNew && nativeWordEntity.lang) || 'FRENCH'}
                  >
                    <option value="FRENCH">
                      <Translate contentKey="backendApp.Language.FRENCH" />
                    </option>
                    <option value="ENGLISH">
                      <Translate contentKey="backendApp.Language.ENGLISH" />
                    </option>
                    <option value="SPANISH">
                      <Translate contentKey="backendApp.Language.SPANISH" />
                    </option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/native-word" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  nativeWordEntity: storeState.nativeWord.entity,
  loading: storeState.nativeWord.loading,
  updating: storeState.nativeWord.updating,
  updateSuccess: storeState.nativeWord.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NativeWordUpdate);
