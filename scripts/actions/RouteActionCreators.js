import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import Route from '../utils/Route';

export default class RouteActionCreators {

  static redirect(route:Route) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }

}
