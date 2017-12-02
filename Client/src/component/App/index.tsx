import * as React from "react";
import { observer } from "mobx-react";
import {
    HashRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Store from "../../store";
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import Home from "../Home";
import Settings from "../Settings";
import About from "../About";
import Articles from "../Articles";
import Index from "../Index";
import PrivateRoute from "../PrivateRoute";
import ViewArticle from "../ViewArticle";
import "./index.scss";

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
                                <Route path="/" component={() => <Index store={store}/>} exact/>
                                <Route path="/articles" component={() => <Articles store={store}/>} />
                                <Route path="/about" component={About}/>
                                <PrivateRoute path="/home/:userName" component={match => <Home match={match} store={store}/>}/>
                                <PrivateRoute path="/settings" component={() => <Settings store={store} /> }/>
                                <Route path="/article/:id" component={match => <ViewArticle match={match} store={store}/>} />
                            </Switch>
                        </Main>
                        <Footer store={store} />
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default () => <App store={new Store()}/>;