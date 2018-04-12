import * as React from "react";
import "./index.scss";

class NotFound extends React.Component<{}, {}> {
    render() {
        return (
            <div className="NotFoundWrap">
                <div>
                    <span className="notFoundNumber">
                        404
                    </span>
                    <span className="notFoundDesc">
                        该页面被汪星人劫持了 !
                    </span>
                </div>
                <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D400/sign=305ab70725dda3cc0be4b92031e83905/8cb1cb1349540923a6384de69958d109b2de49d0.jpg" alt="404"/>
            </div>
        );
    }
}

export default NotFound;