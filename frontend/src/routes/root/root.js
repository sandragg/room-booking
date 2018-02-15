import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {ApolloProvider} from 'react-apollo';
import {Provider} from "react-redux";
import {client} from "../../client/client";
import {Home} from "../../components/home";
import {Edit} from "../../components/edit";

export const Root = ({store}) => (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/edit/:id" component={Edit}/>
                    <Route path="/create" component={Edit}/>
                </div>
            </Router>
        </Provider>
    </ApolloProvider>
);
