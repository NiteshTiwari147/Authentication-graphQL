import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'; 



import App from './components/App';
import LogInForm from './components/LoginForm';
import signupForm from './components/signupForm';
import dashboard from './components/dashboard';
import requireAuth from './components/requireAuth';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})
const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});


const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
         <Route path="/" component={App} >
            <Route path="login" component={LogInForm} />
            <Route path="signup" component={signupForm} />
            <Route path="dashboard" component={requireAuth(dashboard)} />
          </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
