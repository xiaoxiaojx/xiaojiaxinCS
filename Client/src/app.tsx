import * as React from "react";
import * as ReactDom from "react-dom";
import {
    HashRouter as Router,
    Route,
    Switch
  } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "./component/Header";
import Main from "./component/Main";
import Home from "./component/Home";
import Settings from "./component/Settings";
import About from "./component/About";
import Articles from "./component/Articles";
import Index from "./component/Index";
import PrivateRoute from "./component/PrivateRoute";
import "./app.scss";

interface AppProps {
}

class App extends React.Component<AppProps, {}> {
    render() {
        return (
            <Router>
                <MuiThemeProvider>
                    <div>
                        <Header />
                        <Main>
                            <Switch>
                                <Route path="/" component={Index} exact/>
                                <Route path="/articles" component={Articles}/>
                                <Route path="/about" component={About}/>
                                <PrivateRoute path="/home" component={Home}/>
                                <PrivateRoute path="/settings" component={Settings}/>
                            </Switch>
                        </Main>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

ReactDom.render(
    <App />,
    document.getElementById("app")
);
