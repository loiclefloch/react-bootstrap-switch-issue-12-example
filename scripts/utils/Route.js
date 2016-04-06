/**
 * Define a route.
 */
export default class Route {

  // The name (identifier) of the route.
  name:String = '';
  // The path of the route. Ex: /home or /restaurants/:id
  path:String = '';
  // The handler for this route.
  handler:String = '';

  /**
   * Construct a new Route object.
   * @param name The name (identifier) of the route.
   * @param path The path of the route. Ex: /home or /restaurants/:id
   * @param handler The handler for this route.
   */
  constructor(name:String, path:String, handler:String) {
    this.name = name;
    this.path = path;
    this.handler = handler;
  }
}
