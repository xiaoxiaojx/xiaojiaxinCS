import Home from "../Home";
import Settings from "../Settings";
import About from "../About";
import WriteArticle from "../WriteArticle";
import Index from "../Index";
import ViewArticle from "../ViewArticle";

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