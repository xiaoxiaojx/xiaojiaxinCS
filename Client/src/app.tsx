import * as React from "react";
import * as ReactDom from "react-dom";
import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import Login from "./component/Login";
import Header from "./component/Header";
import Main from "./component/Main";
import Settings from "./component/Settings";
import About from "./component/About";
import Articles from "./component/Articles";
import Index from "./component/Index";
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
                        <Route path="/index" component={Index}/>
                        <Route path="/articles" component={Articles}/>
                        <Route path="/home" component={Main}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/about" component={About}/>
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
