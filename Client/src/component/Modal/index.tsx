import * as React from "react";
import {
    FlatButton,
    Dialog
} from "material-ui";
import { ReactChild } from "react";

interface ModalProps {
    okText?: string;
    cancelText?: string;
    children?: ReactChild;
    title?: ReactChild;
    visible: boolean;
    onOk: Function;
    onCancel: Function;
}

export default function Modal(props: ModalProps) {
    const {
        okText = "确定",
        cancelText = "返回",
        title = "",
        onOk,
        onCancel,
        visible
    } = props;
    const actions: JSX.Element[] = [
        <FlatButton
        label={cancelText}
        primary={true}
        onClick={onCancel}
        />,
        <FlatButton
        label={okText}
        primary={true}
        onClick={onOk}
        />
    ];

    return <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={visible}
        onRequestClose={onCancel}
        >
        { props.children }
    </Dialog>;
}