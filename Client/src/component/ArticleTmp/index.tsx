import * as React from "react";
import {
    redirect,
    replaceHtmlTag
} from "../../common/utils";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import {
    PublishArticleReq
} from "../../../services";
import "./index.scss";

interface ArticleTmpProps {
    article: PublishArticleReq;
}

class ArticleTmp extends React.PureComponent<ArticleTmpProps, {}> {
    render() {
        const { article } = this.props;

        return (
            <div className="ArticleTmpWrap">
                <div className="avatar">
                    <img src={article.avatar ? article.avatar : DEFAULT_AVATAR_IMG}/>
                    <span> {article.nickname} </span>
                    <span> {article.date} </span>
                </div>
                <a
                    className="title"
                    onClick={() => redirect(`/article/${article["_id"]}`)}>
                    {article.title}
                </a>
                <a className="content">
                    { replaceHtmlTag(article.content) }
                </a>
            </div>
        );
    }
}

export default ArticleTmp;