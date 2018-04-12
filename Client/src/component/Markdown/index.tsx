import * as React from "react";
import * as ReactMarkdown from "react-markdown";
import "./index.scss";

export default function Markdown({
    className = "",
    ...otherProps
}) {
    const defaultClassName = "MarkdownWrap";

    return <ReactMarkdown
        className={`${defaultClassName} ${className}`}
        {...otherProps as ReactMarkdown.ReactMarkdownProps} />;
}