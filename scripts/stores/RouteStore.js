import EventEmitter from 'events';
import assign from 'object-assign';

import AppDispatcher from '../dispatcher/AppDispatcher.js';

import Router from 'react-router';
import routes from '../routes';
import Route from '../utils/Route';

import ActionTypes from '../constants/ActionTypes';

import RouteActionCreators from '../actions/RouteActionCreators';
import RoutingEnum from '../constants/RoutingEnum';

const router = Router.create({
  routes: routes,
  location: null // Router.HistoryLocation
});

const RouteStore = assign({}, EventEmitter.prototype, {

  addListener: function (event, callback) {
    this.on(event, callback);
  },

  emitEvent: function (event:string) {
    this.emit(event);
  },

  getRouter: function () {
    return router;
  },

  redirectToHome: function () {
    router.transitionTo('app');
  },

  redirectTo: function (route:Route) {
    router.transitionTo(route.path);
  }

});

RouteStore.dispatchToken = AppDispatcher.register(function (payload) {

  AppDispatcher.waitFor([]);

  const action = payload.action;

  switch (action.type) {

    case ActionTypes.REDIRECT:
      RouteStore.redirectTo(action.route);
      break;

    default:
  }

  return true;
});

export default RouteStore;
