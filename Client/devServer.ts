import * as express from "express";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import * as path from "path";
import config from "./webpack.config";

const app = express();
const compiler = webpack(config);

app.use(express.static(path.join(__dirname, "../asset")) as any);

app.use(webpackDevMiddleware(compiler, {
    stats: {
        colors: true,
        chunks: false,
        children: false
    }
}));
app.use(webpackHotMiddleware(compiler) as any);


app.listen(3333, err => {
    if (err) {
        return console.error(err);
    }
    console.info("Listening at http://localhost:3333");
});