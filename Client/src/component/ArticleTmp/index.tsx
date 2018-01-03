import * as React from "react";
import LazyLoad from "react-lazy-load";
import {
    IconButton,
    Avatar,
} from "material-ui";
import IChat from "material-ui/svg-icons/communication/chat";
import IFavorite from "material-ui/svg-icons/action/favorite";
import IFace from "material-ui/svg-icons/action/face";
import {
    redirect,
    replaceHtmlTag,
    getCompleteImgUrl
} from "../../common/utils";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import chipItems, { ChipType } from "../../common/chips";
import {
    PublishArticlesRes,
} from "../../../services";
import "./index.scss";

interface ArticleTmpProps {
    article: PublishArticlesRes;
}

class ArticleTmp extends React.PureComponent<ArticleTmpProps, {}> {
    contentImage(): string {
        const { article } = this.props;
        if (article.content.includes("src=\"")) {
            return article.content.split("src=\"")[1].split("\"")[0];
        }
        if (article.content.includes("![image](")) {
            return article.content.split("![image](")[1].split("\)")[0];
        }
        return "";
    }
    renderTags(type: ChipType) {
        const target = chipItems.find(item => item.value === type);
        const text = target ? target.label : "散文";
        return <span className="tags"> {text} </span> ;
    }
    render() {
        const { article } = this.props;
        const contentImage = this.contentImage();

        return (
            <LazyLoad height={176}>
                <div className="ArticleTmpWrap">
                    <div  className="imageContentWrap">
                        <div>
                            <div className="avatar">
                                <IconButton
                                    onClick={() => redirect(`/home/${article.userName}`)}
                                    tooltip="点击进入我的主页">
                                    <Avatar
                                        size={40}
                                        src={article.avatar ? getCompleteImgUrl(article.avatar) : DEFAULT_AVATAR_IMG}/>
                                </IconButton>
                                <div>
                                    <div> {article.nickname} </div>
                                    <div className="date"> {article.date} </div>
                                </div>
                            </div>
                            <div>
                                <a
                                    className="title"
                                    onClick={() => redirect(`/article/${article["_id"]}`)}>
                                    {article.title}
                                </a>
                                <div className="content">
                                    { replaceHtmlTag(article.content) }
                                </div>
                            </div>
                        </div>
                        <img
                            className="imageContent"
                            style={{display: contentImage ? "block" : "none"}}
                            src={contentImage}
                            alt="图片未正确显示" />
                    </div>
                    <div className="comment">
                        { this.renderTags(article.chipType) }
                        <IFace />
                        <span> {article.views} </span>
                        <IChat />
                        <span> {article.comment} </span>
                        <IFavorite />
                        <span> {article.like} </span>
                    </div>
                </div>
            </LazyLoad>
        );
    }
}

export default ArticleTmp;