import * as React from "react";
import {
    Snackbar
} from "material-ui";

const snackbarStyle = {
    contentStyle : {
        backgroundColor: "#6fbed5", color: "#fff"
    },
    bodyStyle: {
        backgroundColor: "#6fbed5"
    }
};

interface TooltipProps {
    visible: boolean;
    message: string;
    autoHideDuration?: number;
}

export default function Tooltip(props: TooltipProps) {
    const {
        visible,
        message,
    } = props;

    return (
        <Snackbar
            {...snackbarStyle}
            open={visible}
            message={message} />
    );
}