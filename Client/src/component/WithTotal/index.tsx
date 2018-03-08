import * as React from "react";
import "./index.scss";

interface WithTotalProps {
    children: React.ReactNode;
    total: number;
}

function WithTotal(props: WithTotalProps) {
    return (
        <div className="LikeIconWrap">
            { props.children }
            <span className="likeTotal"> {props.total || ""} </span>
        </div>
    );
}

export default WithTotal;