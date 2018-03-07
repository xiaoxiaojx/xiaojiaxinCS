import * as React from "react";
import { Provider } from "mobx-react";
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
import PrivateRoute from "../PrivateRoute";
import routes from "./router";
import "./index.scss";

const RouteWithSubRoutes = route => {
    const SubRoutes = route.public ? Route : PrivateRoute;
    return (
	<SubRoutes path={route.path} exact={route.exact} component={match => (
		<route.component match={match} />
    )}/> );
};

const RouteWithSwitch =
    <Switch>
        {
            routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route}/>
            ))
        }
    </Switch>;


class App extends React.Component<{}, {}> {
    render() {
        return (
            <Router>
                <MuiThemeProvider>
                    <Provider store={new Store()}>
                        <div>
                            <Header />
                            <Main>
                                { RouteWithSwitch }
                            </Main>
                            <Footer />
                        </div>
                    </Provider>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;