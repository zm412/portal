import React from 'react';
import { Profile } from './components/Profile';
import {Provider} from 'react-redux';
import {store} from './reducers'


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      is_super: document.querySelector('#user_info').dataset.is_super.toLowerCase()|| false,
      userid: document.querySelector('#user_info').dataset.userid,
      username: document.querySelector('#user_info').dataset.username,
    };
  }
   

  render() {

    return (

    <div className="App-header">
        <Provider store={store}>
              <div><Profile is_super={ this.state.is_super } userid={this.state.userid} username={this.state.username} /></div>
        </Provider>
    </div>
          
    );
  }
}

export default App;
