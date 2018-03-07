import * as React from "react";
import * as ReactDom from "react-dom";
import App from "./component/App";

declare var module;

function render(NewApp) {
    const container: HTMLElement = document.getElementById("app") || document.body;
    ReactDom.render(
        <NewApp />,
        container
    );
}

render(App);
if (module.hot) {
    module.hot.accept("./component/App", async () => {
        const NewApp = await import("./component/App");
        render(NewApp.default);
    });
}