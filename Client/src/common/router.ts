import * as React from "react";
import Home from "../component/Home";
import Settings from "../component/Settings";
import About from "../component/About";
import WriteArticle from "../component/WriteArticle";
import Index from "../component/Index";
import ViewArticle from "../component/ViewArticle";

export interface RouterItem {
    path: string;
    component: typeof React.Component;
    public: boolean;
    exact: boolean;
}

export default [{
    path: "/",
    component: Index,
    public: true,
    exact: true
}, {
    path: "/write",
    component: WriteArticle,
    public: true,
    exact: false
}, {
    path: "/about",
    component: About,
    public: true,
    exact: false
}, {
    path: "/home/:userName",
    component: Home,
    public: true,
    exact: false
}, {
    path: "/article/:id",
    component: ViewArticle,
    public: true,
    exact: false
}, {
    path: "/settings",
    component: Settings,
    public: false,
    exact: false
}];