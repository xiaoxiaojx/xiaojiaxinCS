import * as React from "react";
import * as ReactDom from "react-dom";
import { observer } from "mobx-react";
import {
    HashRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Store from "./store";
import Header from "./component/Header";
import Main from "./component/Main";
import Footer from "./component/Footer";
import Home from "./component/Home";
import Settings from "./component/Settings";
import About from "./component/About";
import Articles from "./component/Articles";
import Index from "./component/Index";
import PrivateRoute from "./component/PrivateRoute";
import ViewArticle from "./component/ViewArticle";
import "./app.scss";

interface AppProps {
    store: Store;
}

@observer
class App extends React.Component<AppProps, {}> {
    render() {
        const { store } = this.props;

        return (
            <Router>
                <MuiThemeProvider>
                    <div>
                        <Header store={store} />
                        <Main>
                            <Switch>
                                <Route path="/" component={() => <Index  store={store}/>} exact/>
                                <Route path="/articles" component={() => <Articles store={store}/>} />
                                <Route path="/about" component={About}/>
                                <PrivateRoute path="/home" component={() => <Home  store={store}/>}/>
                                <PrivateRoute path="/settings" component={() => <Settings store={store} /> }/>
                                <Route path="/article/:id" component={match => <ViewArticle match={match}/>} />
                            </Switch>
                        </Main>
                        <Footer store={store} />
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

ReactDom.render(
    <App store={new Store()}/>,
    document.getElementById("app")
);
