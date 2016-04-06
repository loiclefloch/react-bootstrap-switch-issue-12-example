import ReactDOM from 'react-dom';
import React from 'react';
import RouteStore from './stores/RouteStore';

window.React = React;

RouteStore.getRouter().run((Handler:Object, state:Object) => {
  ReactDOM.render(<Handler state={state} />, document.getElementById('app'));
});
