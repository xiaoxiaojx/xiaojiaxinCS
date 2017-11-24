import * as React from "react";
import {
    Route,
    Redirect
} from "react-router-dom";
import {
	getLocalStorageData
} from "../../common/utils";

export default function PrivateRoute ({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => (
            getLocalStorageData() ? (
                <Component {...props}/>
            ) :
            <Redirect to={{
            pathname: "/"
            }}/>
        )}/>
    );
}
