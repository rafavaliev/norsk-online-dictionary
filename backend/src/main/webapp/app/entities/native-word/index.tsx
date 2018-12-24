import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NativeWord from './native-word';
import NativeWordDetail from './native-word-detail';
import NativeWordUpdate from './native-word-update';
import NativeWordDeleteDialog from './native-word-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NativeWordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NativeWordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NativeWordDetail} />
      <ErrorBoundaryRoute path={match.url} component={NativeWord} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NativeWordDeleteDialog} />
  </>
);

export default Routes;
