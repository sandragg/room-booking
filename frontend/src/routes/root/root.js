import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {ApolloProvider} from 'react-apollo';
import {client} from "../../client/client";
import {Home} from "../../components/home";
import {Edit} from "../../components/edit";

export const Root = ({store}) => (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/:state" component={Edit}/>
                </div>
            </Router>
        </Provider>
    </ApolloProvider>
);
