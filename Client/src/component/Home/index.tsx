import * as React from "react";
import { observer, inject } from "mobx-react";
import {
    RaisedButton,
    TextField,
    Checkbox
} from "material-ui";
import IFavorite from "material-ui/svg-icons/action/favorite";
import Store from "../../store";
import ArticleTmp from "../ArticleTmp";
import FolderTmp from "../FolderTmp";
import Modal from "../Modal";
import {
    redirect,
    getSearchParamValue
} from "../../common/utils";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import {
    User,
    PublishArticlesRes,
    GetUserInfo,
    GetArticles,
    SetArticle
} from "../../../services";
import "./index.scss";

interface HomeProps {
    store: Store;
    match: any;
}

interface HomeState {
    userInfo: Partial<User>;
    articles: PublishArticlesRes[];
    folder: string;
    visible: boolean;
}

const defaultFolder = location.hash.includes("?") ?
    getSearchParamValue("folder", "?" + location.hash.split("?")[1])
    : "";

@inject("store")
@observer
class Home extends React.Component<HomeProps, HomeState> {
    state: HomeState = {
        userInfo: {},
        articles: [],
        folder: defaultFolder,
        visible: false
    };

    componentDidMount() {
        this.getUserInfo();
        this.getArticles();
    }
    getUserInfo() {
        const { match } = this.props;
        const { userName } = match.match.params;
        GetUserInfo({userName})
            .then(result => {
                if (result.data)
                    this.setState({userInfo: result.data});
            });
    }
    getArticles() {
        const { match } = this.props;
        const { userName } = match.match.params;
        GetArticles({userName})
            .then(result => {
                if (result.data)
                    this.setState({articles: result.data.reverse()});
            });
    }
    setArticleFolder(id: string, folder: string) {
        SetArticle({
            id,
            reqData: {
                folder
            }
        }).then(() => this.getArticles());
    }
    isSelf() {
        const { store, match } = this.props;
        const { userName } = match.match.params;
        const { localStorageQaqData } = store;
        return localStorageQaqData && userName === localStorageQaqData["userName"];
    }
    render() {
        const {
            userInfo,
            articles,
            folder,
            visible
        } = this.state;
        const {
            avatar,
            nickname,
            selfIntroduction = "个人介绍(赶紧去设置吧)",
            email = "邮箱(赶紧去设置吧)"
        } = userInfo;
        const src = avatar ? avatar : DEFAULT_AVATAR_IMG;
        const likeTotal = articles.reduce((preVal, cVal) => preVal + (cVal.like || 0), 0);
        const viewTotal = articles.reduce((preVal, cVal) => preVal + (cVal.views || 0), 0);
        const currentArticles = articles.filter(item => item.folder === folder || !folder || folder === "全部");
        const foldersData = Array.from(new Set(
            articles
                .reduce((preVal, cVal) => preVal.concat(cVal.folder), [] as string[])
        )).map(item => ({
            name: item,
            total: articles.filter(art => !item || item === "全部" || art.folder === item).length
        }));
        const folders = (foldersData.filter(f => !f.name || f.name === "全部").length > 0 ? foldersData :
            [{
                name: "全部",
                total: articles.length
            }, ...foldersData])
            .sort((a, b) => b.total - a.total);
        let addFolderName = "";
        let addFolderIds: string[] = [];

        return (
            <div className="HomeWrap">
                <header>
                    <img src={src}/>
                    <div className="nickname"> {nickname} </div>
                    <div className="email">
                        <a href={`mailto:${email}`}>
                            {email}
                        </a>
                    </div>
                    <div className="selfIntroduction"> {selfIntroduction} </div>
                    <div className="like">
                        <img src="/staticImage/readlilght.svg" />
                        <span> 文章被阅读 {viewTotal} 次 </span>
                        <IFavorite />
                        <span> 获得喜欢 {likeTotal} 次 </span>
                    </div>
                    {
                        this.isSelf() ?
                        <button
                            className="setting"
                            onClick={() => redirect("/settings")}>
                            设置
                        </button> : null

                    }
                </header>
                <main>
                    <div className="articleFolder">
                        <img src="/staticImage/label.svg" />
                        <FolderTmp
                            folders={folders}
                            folder={folder}
                            onChange={val => this.setState({
                                folder: val
                            })} />
                        {
                          this.isSelf() ?
                          <RaisedButton
                            label=" ＋ 新增收藏夹"
                            style={{transform: "scale(0.85)"}}
                            onClick={() => this.setState({visible: true})}
                            primary />
                            : null
                        }
                    </div>
                    <div className="articleHeader">
                        <span>
                            {currentArticles.length}篇文章
                        </span>
                    </div>
                    <div className="articles">
                    {
                        currentArticles.length > 0 ?
                        currentArticles.map((article, index) =>
                            <ArticleTmp
                                key={index}
                                article={article}
                                folders={this.isSelf() ? folders.map(item => item.name || "全部") : undefined}
                                folder={article.folder || "全部"}
                                onChange={ val =>  this.setArticleFolder(article._id, val)} />
                        )
                        :
                        <div className="article">
                            赶紧去写篇文章吧
                        </div>
                    }
                    </div>
                </main>
                <footer>
                    <Modal
                        title="新增收藏夹"
                        visible={visible}
                        cancelText="取消添加"
                        okText="确认添加"
                        onCancel={() => {
                            this.setState({visible: false});
                            addFolderName = "";
                            addFolderIds = [];
                        }}
                        onOk={() => {
                            if (addFolderIds.length > 0 && addFolderName) {
                                addFolderIds.forEach(id => this.setArticleFolder(id, addFolderName));
                                this.setState({visible: false});
                                addFolderName = "";
                                addFolderIds = [];
                            }
                        }} >
                        <TextField
                            style={{width: 200}}
                            hintText="请输入收藏夹名"
                            onChange={ (e: any) => addFolderName = e.target.value } />
                        <div className="addFolderItems">
                            <span> 最少选择一篇文章(加入新的收藏夹) </span>
                            {
                                articles.map((item, index) =>
                                    <Checkbox
                                        label={item.title}
                                        style={{width: "auto", wordBreak: "keep-all", margin: "0 20px"}}
                                        onCheck={(e, checked) => {
                                            addFolderIds = addFolderIds.filter(id => id !== item._id);
                                            if (checked) {
                                                addFolderIds.push(item._id);
                                            }
                                        }}
                                        />
                                )
                            }
                        </div>
                    </Modal>
                </footer>
            </div>
        );
    }
}

export default Home;