import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "material-ui/Card";
import Store from "../../store";
import ArticleTmp from "../ArticleTmp";
import {
    redirect
} from "../../common/utils";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import {
    User,
    PublishArticleRes,
    GetUserInfo,
    GetArticles
} from "../../../services";
import "./index.scss";

interface HomeProps {
    store: Store;
    match: any;
}

interface HomeState {
    userInfo: Partial<User>;
    articles: PublishArticleRes[];
}

@observer
class Home extends React.Component<HomeProps, HomeState> {
    state: HomeState = {
        userInfo: {},
        articles: []
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
        const { userInfo, articles } = this.state;
        const {
            avatar,
            nickname,
            selfIntroduction = "个人介绍(赶紧去设置吧)",
            email = "邮箱(赶紧去设置吧)"
        } = userInfo;
        const src = avatar ? avatar : DEFAULT_AVATAR_IMG;

        return (
            <Card className="HomeWrap">
                <header>
                    <img src={src}/>
                    <div className="nickname"> {nickname} </div>
                    <div className="email">
                        <a href={`mailto:${email}`}>
                            {email}
                        </a>
                    </div>
                    <div className="selfIntroduction"> {selfIntroduction} </div>
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
                    <div className="header">
                        <span>
                            {articles.length}篇文章
                        </span>
                    </div>
                    <div className="articles">
                    {
                        articles.length > 0 ?
                        articles.map((article, index) =>
                            <ArticleTmp key={index} article={article}/>
                        )
                        :
                        <div className="article">
                            赶紧去写篇文章吧
                        </div>
                    }
                    </div>
                </main>
            </Card>
        );
    }
}

export default Home;