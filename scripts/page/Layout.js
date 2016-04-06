import React from 'react';
import { RouteHandler } from 'react-router';

/**
 * @parent index.js
 */
export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <div className="container-fluid">
          <RouteHandler />
        </div>
      </div>
    );
  }
}
