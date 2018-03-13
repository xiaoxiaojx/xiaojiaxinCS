import * as React from "react";
import { observer, inject } from "mobx-react";
import IFavorite from "material-ui/svg-icons/action/favorite";
import Store from "../../store";
import ArticleTmp from "../ArticleTmp";
import FolderTmp from "../FolderTmp";
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
        folder: defaultFolder
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
    isSelf() {
        const { store, match } = this.props;
        const { userName } = match.match.params;
        const { localStorageQaqData } = store;
        return localStorageQaqData && userName === localStorageQaqData["userName"];
    }
    render() {
        const { userInfo, articles, folder } = this.state;
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
        const folders = Array.from(new Set(
            articles
                .reduce((preVal, cVal) => preVal.concat(cVal.folder), [] as string[])
        )).reverse().map(item => ({
            name: item,
            total: articles.filter(art => !item || item === "全部" || art.folder === item).length
        }));

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
                        {
                            <FolderTmp
                                folders={folders}
                                folder={folder}
                                onChange={val => this.setState({
                                    folder: val
                                })} />
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
                            <ArticleTmp key={index} article={article}/>
                        )
                        :
                        <div className="article">
                            赶紧去写篇文章吧
                        </div>
                    }
                    </div>
                </main>
            </div>
        );
    }
}

export default Home;