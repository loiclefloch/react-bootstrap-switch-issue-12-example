import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import Layout from './page/Layout';

import RoutingEnum from './constants/RoutingEnum';

const routes = (
  <Route name="app" path="/" handler={ Layout }>

    <DefaultRoute handler={RoutingEnum.HOME.handler} />

    <Route
      name={RoutingEnum.HOME.name}
      path={RoutingEnum.HOME.path}
      handler={RoutingEnum.HOME.handler}
    />

  </Route>
);

export default routes;
