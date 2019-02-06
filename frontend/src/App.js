import React, { Component } from 'react';
import { Flipper } from 'react-flip-toolkit';

import { Navbar, Icon } from 'react-materialize';
import { Route, NavLink } from 'react-router-dom';
import { apiActions } from 'redux-jsonapi';
import Library from './routes/Library';
import Settings from './routes/Settings';
import Home from './routes/Home';
import Video from './routes/Video';
import store from './helpers/stores/settingsStore';
import Detail from './routes/Detail';
import ShortcutHelper from './helpers/ShortcutHelper';


class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.onShortcut = this.onShortcut.bind(this);
  }

  componentWillMount() {
    store.subscribe(() => {
      if (!store.getState().api.setting) {
        return;
      }
      this.setState({ name: store.getState().api.setting[1].attributes.name });
    });
    store.dispatch(apiActions.read({ id: 1, _type: 'settings' }));

    ShortcutHelper.setOnSuccessfulShortcut(this.onShortcut);
  }

  onShortcut(result) {
    if(!result) return;
    if (this.hideShortcutText) { clearTimeout(this.hideShortcutText); }
    this.setState({ shortcutText: result, showShortcutText: true });
    this.hideShortcutText = setTimeout(
      () => this.setState({ showShortcutText: false }),
      350,
    );
  }

  render() {
    return (
      <div className="App">
        <Navbar
          options={{ closeOnClick: true }}
          brand={<div><img alt="Remote MediaServer" src="/assets/img/logo_small.png" height={25} /> {this.state.name}</div>}
          right
        >
          <li>
            <NavLink to="/" exact>
              <Icon left>home</Icon>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Library">
              <Icon left>video_library</Icon>
              Library
            </NavLink>
          </li>
          <li>
            <NavLink to="/Settings">
              <Icon left>settings</Icon>
              Settings
            </NavLink>
          </li>
        </Navbar>
        <Flipper
          flipKey={this.props.location.pathname + this.props.location.search}
        >
          <Route path="/" component={Home} exact />
          <Route path="/Library" component={Library} exact />
          <Route path="/Settings" component={Settings} />
          <Route path="/item/detail/:id" component={Detail} />
          <Route path="/item/view/:id" component={Video} />
        </Flipper>
        <div className={`shortcutText ${this.state.showShortcutText ? 'visible' : ''}`}>
          {this.state.shortcutText}
        </div>
      </div>
    );
  }
}

export default App;
