import * as React from "react";
import {
    IconButton,
    Avatar
} from "material-ui";
import IChat from "material-ui/svg-icons/communication/chat";
import IFavorite from "material-ui/svg-icons/action/favorite";
import {
    redirect,
    replaceHtmlTag
} from "../../common/utils";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import {
    PublishArticleRes
} from "../../../services";
import "./index.scss";

interface ArticleTmpProps {
    article: PublishArticleRes;
}

class ArticleTmp extends React.PureComponent<ArticleTmpProps, {}> {
    render() {
        const { article } = this.props;

        return (
            <div className="ArticleTmpWrap">
                <div className="avatar">
                    <IconButton
                        onClick={() => redirect(`/home/${article.userName}`)}
                        tooltip="点击进入我的主页">
                        <Avatar
                            size={40}
                            src={article.avatar ? article.avatar : DEFAULT_AVATAR_IMG}/>
                    </IconButton>
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
                <div className="comment">
                    <IChat />
                    <span> 122 </span>
                    <IFavorite />
                    <span> 122 </span>
                </div>
            </div>
        );
    }
}

export default ArticleTmp;