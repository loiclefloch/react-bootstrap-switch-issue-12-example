import Route from '../utils/Route';

import HomePage from '../page/home/HomePage';

/**
 * Define all the app routes.
 * - name: The unique name of the route.
 * - path: The route url.
 * - handler: The react component that handle the route.
 */
class RoutingEnum {

  static HOME = new Route('home', '/', HomePage);
}

export default RoutingEnum;
