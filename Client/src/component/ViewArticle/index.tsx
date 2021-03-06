import * as React from "react";
import { observer, inject } from "mobx-react";
import {
    Avatar,
    TextField,
    RaisedButton,
    FlatButton
} from "material-ui";
import IFavorite from "material-ui/svg-icons/action/favorite";
import Modal from "../Modal";
import {
    GetArticle,
    PublishArticleRes,
    SetArticle,
    DelArticle,
    User
} from "../../../services";
import Store from "../../store";
import CommentTmp from "../CommentTmp";
import WithTotal from "../WithTotal";
import Markdown from "../Markdown";
import {
    replaceHtmlTag,
    redirect,
    setDocumentTitle,
    getFormatDate
} from "../../common/utils";
import {
    ChipType
} from "../../common/chips";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import "./index.scss";

interface ViewArticleProps {
    match: any;
    store: Store;
}

interface ViewArticleState {
    article: PublishArticleRes;
    commentContent: string;
    visible: boolean;
}

@inject("store")
@observer
class ViewArticle extends React.Component<ViewArticleProps, ViewArticleState> {
    state: ViewArticleState = {
        article: {} as PublishArticleRes,
        commentContent: "",
        visible: false
    };

    componentDidMount() {
        const callBack = () => {
            setDocumentTitle(`${this.state.article.nickname} - ${this.state.article.title}`);
            this.viewArticle();
        };
        this.getArticle(callBack);
    }
    componentWillUnmount() {
        setDocumentTitle();
    }
    getArticle(cb = () => {}) {
        const { match } = this.props;
        const { id } = match.match.params;
        GetArticle({id})
            .then(result => {
                if ( result.data ) {
                    this.setState({ article: result.data }, cb);
                }
                return result.data;
            });
    }
    hasLike() {
        const { store } = this.props;
        const { article } = this.state;
        return article.like && store.localStorageQaqData &&
            article.like.filter(item => item.userName === store.localStorageQaqData["userName"]).length > 0;
    }
    likeArticle() {
        const { store } = this.props;
        const { localStorageQaqData, setShowLoginRegisterModal } = store;
        if (!localStorageQaqData) {
            setShowLoginRegisterModal(true);
        } else {
            const { article } = this.state;
            const { like, _id } = article;
            const { userName } = localStorageQaqData as User;
            if (this.hasLike()) {
                let index: number = 0;
                article.like.forEach((item, i) => {
                    if (item.userName === userName) {
                        index = i;
                    }
                });
                like.splice(index, index + 1);
            } else {
                like.push({
                    userName
                });
            }
            SetArticle({
                id: _id,
                reqData: { like }
            }).then(result => {
                if (!result.error)
                    this.getArticle();
            });
        }
    }
    commentArticle() {
        const { store } = this.props;
        const { commentContent, article } = this.state;
        const { comment, _id } = article;
        const date = getFormatDate();
        const { localStorageQaqData, setShowLoginRegisterModal } = store;
        if (!localStorageQaqData) {
            setShowLoginRegisterModal(true);
        } else {
            const { userName } = localStorageQaqData as User;
            comment.push({
                userName,
                content: commentContent,
                date
            });
            SetArticle({
                id: _id,
                reqData: { comment }
            }).then(result => {
                if (!result.error)
                    this.getArticle();
                    this.setState({
                        commentContent: ""
                    });
            });
        }
    }
    viewArticle() {
        const { article } = this.state;
        SetArticle({
            id: article._id,
            reqData: { views: article.views ? ++article.views : 1 }
        });
    }
    delArticles() {
        const { store } = this.props;
        const { article } = this.state;
        DelArticle({id: article._id})
            .then(result => {
                if (!result.error) {
                    store.getArticles();
                    redirect("/");
                }
            });
        this.setState({visible: false});
    }
    setArticles() {
        const { store } = this.props;
        const { article } = this.state;
        store.setCurrentEditArticleId(article._id);
        store.setArticleData({
            editor: article.editor,
            title: article.title,
            chipType: article.chipType || ChipType.Prose,
            quillVal: article.editor === "富文本" ? article.content : "",
            markVal: article.editor === "Markdown" ? article.content : "",
            folder: article.folder
        });
        redirect("/write");
    }
    render() {
        const { store } = this.props;
        const { article, commentContent, visible } = this.state;
        const src = article["avatar"] ? article["avatar"] : DEFAULT_AVATAR_IMG;
        const scrolltHeight = document.body.clientHeight - window.innerHeight;

        return (
            <div className="ViewArticleWrap">
                {
                    store.scrollY > 100 && store.scrollY < scrolltHeight - 350 ?
                    <div className="floatLike">
                        <WithTotal
                            total={article.like ? article.like.length : 0}>
                            <IFavorite
                                style={{width: "34px", height: "34px"}}
                                className={this.hasLike() ? "like likeSvg" : "normal likeSvg"}
                                onClick={this.likeArticle.bind(this)}/>
                        </WithTotal>
                        <WithTotal
                            total={article.comment ? article.comment.length : 0}>
                            <img
                                style={{width: "30px", height: "30px"}}
                                onClick={() => window.scrollTo(0, scrolltHeight)}
                                className="likeSvg"
                                src="./staticImage/comment.svg"/>
                        </WithTotal>
                        <WithTotal
                            total={article.views}>
                            <img
                                style={{width: "26px", height: "26px"}}
                                className="likeSvg"
                                src="./staticImage/read.svg"/>
                        </WithTotal>
                    </div>
                    : null
                }
                <main>
                    <div className="avatar">
                        <img src={src} onClick={() => redirect(`/home/${article.userName}`)}/>
                        <span>
                            <div className="nickname">
                                { article.nickname }
                            </div>
                            <div className="date">
                                <span>{ article.date }</span>
                                <label>字数</label>
                                <span>{ article.content ? replaceHtmlTag(article.content).length : 0}</span>
                                <label>阅读</label>
                                <span>{article.views}</span>
                            </div>
                        </span>
                    </div>
                    <h1 className="title">
                        { article.title }
                    </h1>
                    {
                        store.localStorageQaqData && article.userName === store.localStorageQaqData["userName"] &&
                        <div className="action">
                            <FlatButton
                                label="编辑文章"
                                primary
                                onClick={this.setArticles.bind(this)} />
                            <FlatButton
                                label="删除文章"
                                secondary
                                onClick={() => this.setState({visible: true})} />
                        </div>
                    }
                    <div className="content">
                    {
                        article.editor === "Markdown" ?
                        <Markdown
                            source={article.content} />
                        :
                        <p dangerouslySetInnerHTML={{__html: article.content}}>
                        </p>
                    }
                    </div>
                    <div className="categoryWrap">
                        <img src="./staticImage/category.svg" />
                        <a onClick={() => {
                            store.setFilterArticles({ chipType: article.chipType || ChipType.All });
                            redirect("/");
                        }}>
                            {article.chipType || ChipType.Prose}
                        </a>
                        <img src="./staticImage/label.svg" />
                        <a onClick={ () => {
                            redirect(`/home/${article.userName}?folder=${article.folder}`);
                        }
                        }> {article.folder || "全部"} </a>
                    </div>
                    <div className="likeWrap">
                        <div>
                            <IFavorite
                                className={this.hasLike() ? "like" : "normal"}
                                onClick={this.likeArticle.bind(this)}/>
                            <span>
                                { article.like ? article.like.length : 0 }
                            </span>
                        </div>
                        <div>
                            {
                                article.like ?
                                article.like.map((item, index) =>
                                    <Avatar
                                        key={index}
                                        onClick={() => redirect(`/home/${item.userName}`)}
                                        size={30}
                                        src={item.avatar}
                                        />
                                ) : null
                            }
                        </div>
                    </div>
                    <div className="comment">
                        <div>
                            {
                                article.comment ?
                                article.comment.map((item, index) =>
                                    <CommentTmp index={index} key={index} comment={item}/>
                                ) : null
                            }
                        </div>
                        <TextField
                            value={commentContent}
                            onChange={ e => this.setState({ commentContent: e.target.value }) }
                            floatingLabelText="我也来说几句..."
                            multiLine
                            rows={2}
                            fullWidth
                            />
                        <div className="commentBtnWrap">
                            <RaisedButton
                                onClick={this.commentArticle.bind(this)}
                                disabled={commentContent === ""}
                                label="评论"
                                primary />
                        </div>
                    </div>
                </main>
                <Modal
                    title="确认要删除这篇文章吗?"
                    visible={visible}
                    onCancel={() => this.setState({visible: false})}
                    onOk={this.delArticles.bind(this)}>
                    ( ⊙ o ⊙ )啊！
                </Modal>
            </div>
        );
    }
}

export default ViewArticle;