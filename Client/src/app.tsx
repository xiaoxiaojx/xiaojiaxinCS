import * as React from "react";
import * as ReactDom from "react-dom";
import App from "./component/App";

// declare var module;

function render() {
    const container: HTMLDivElement = document.getElementById("app") as HTMLDivElement;
    ReactDom.render(
        <App />,
        container
    );
}

render();
// if (module.hot) {
//     module.hot.accept("./component/App/index.tsx", () => {
//         render();
//     });
// }