import * as React from "react";
import "./index.scss";

interface MainProps {
    children: React.ReactNode;
}

function Main(props: MainProps) {
    return (
        <div className="MainWrap">
            {props.children}
        </div>
    );
}

export default Main;