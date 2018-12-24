import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './native-word.reducer';
import { INativeWord } from 'app/shared/model/native-word.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INativeWordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NativeWordDetail extends React.Component<INativeWordDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nativeWordEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="backendApp.nativeWord.detail.title">NativeWord</Translate> [<b>{nativeWordEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="word">
                <Translate contentKey="backendApp.nativeWord.word">Word</Translate>
              </span>
            </dt>
            <dd>{nativeWordEntity.word}</dd>
            <dt>
              <span id="lang">
                <Translate contentKey="backendApp.nativeWord.lang">Lang</Translate>
              </span>
            </dt>
            <dd>{nativeWordEntity.lang}</dd>
          </dl>
          <Button tag={Link} to="/entity/native-word" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/native-word/${nativeWordEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ nativeWord }: IRootState) => ({
  nativeWordEntity: nativeWord.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NativeWordDetail);
