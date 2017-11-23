import * as React from "react";
import {
    Route,
    Redirect
} from "react-router-dom";
import {
	getLocalStorageData
} from "../../common/utils";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        getLocalStorageData() ? (
            <Component {...props}/>
        ) : 
        <Redirect to={{
          pathname: '/'
        }}/>
    )}/>
)

export default PrivateRoute;