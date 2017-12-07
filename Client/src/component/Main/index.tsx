import * as React from "react";
import "./index.scss";

class Main extends React.Component<{}, {}> {
    render() {
        return (
            <div className="MainWrap">
                {this.props.children}
            </div>
        );
    }
}

export default Main;