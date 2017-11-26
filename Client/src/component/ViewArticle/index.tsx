import * as React from "react";
import {
    GetArticle,
    PublishArticleReq,
    GetArticles
} from "../../../services";
import {
    redirect
} from "../../common/utils";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import "./index.scss";

interface ViewArticleProps {
    match: any;
}

interface ViewArticleState {
    article: PublishArticleReq;
    articles: PublishArticleReq[];
}

class ViewArticle extends React.Component<ViewArticleProps, ViewArticleState> {
    state: ViewArticleState = {
        article: {} as PublishArticleReq,
        articles: []
    };
    componentDidMount() {
        this.getArticle();
    }
    async getArticle() {
        const { match } = this.props;
        const { id } = match.match.params;
        const article = await GetArticle({id})
            .then(result => {
                this.setState({ article: result.data });
                return result.data;
            });
        this.getArticles(article.userName);
    }
    getArticles(userName: string) {
        GetArticles({userName})
            .then(result => this.setState({
                articles: result.data
            }));
    }
    render() {
        const { article, articles } = this.state;
        const src = article["avatar"] ? article["avatar"] : DEFAULT_AVATAR_IMG;

        return (
            <div className="ViewArticleWrap">
                <main>
                    <div className="avatar">
                        <img src={src}/>
                        <span>
                            <div className="nickname">
                                { article.nickname }
                            </div>
                            <div className="date">
                                { article.date }
                            </div>
                        </span>
                    </div>
                    <h1 className="title">
                        { article.title }
                    </h1>
                    <p dangerouslySetInnerHTML={{__html: article.content}}>
                    </p>
                </main>
                <nav>
                    <div className="allArticles">
                        <div>
                            所有文章
                        </div>
                        {
                            articles.map((art, index) =>
                            <div key={index} className="articlesList">
                                <a
                                    onClick={() => {
                                        redirect(`/article/${art["_id"]}`);
                                        location.reload();
                                    }}>
                                    {art.title}
                                </a>
                                <span className="date"> {art.date} </span>
                            </div>
                        )
                        }
                    </div>
                </nav>
            </div>
        );
    }
}

export default ViewArticle;