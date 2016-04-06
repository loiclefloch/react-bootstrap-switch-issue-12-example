import { Dispatcher } from 'flux';
import assign from 'object-assign';

import PayloadSources from '../constants/PayloadSources';

/**
 * The dispatcher is the core of the app
 * it’s the central hub for the messages (actions)
 * Two main methods, one will handle the dispatch of server-initiated action,
 * the other one the view-initiated actions.
 */
class AppDispatcher extends Dispatcher {

  handleServerAction(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

  handleViewAction(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
}

export default new AppDispatcher();