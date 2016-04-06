import React from 'react';

import RoutingEnum from '../../constants/RoutingEnum';

import Switch from 'react-bootstrap-switch';

export default class HomePage extends React.Component {

  render() {

    return (
      <table className="table">
        <tbody>
          <Row name="test A" />
          <Row name="test B" />
          <Row name="test C" />
          <Row name="test D" />
        </tbody>
      </table>
    );

  }

}

class Row extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired
  };

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
          <Switch size="mini" />
        </td>
      </tr>
    )
  }

}