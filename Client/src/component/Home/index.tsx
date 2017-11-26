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
    PublishArticleReq
} from "../../../services";
import "./index.scss";

interface HomeProps {
    store: Store;
}

interface HomeState {
    userInfo: Partial<User>;
    articles: PublishArticleReq[];
}

@observer
class Home extends React.Component<HomeProps, HomeState> {
    state: HomeState = {
        userInfo: {},
        articles: []
    };

    componentDidMount() {
        const { store } = this.props;
        store.getUserInfo().then(result => this.setState({userInfo: result.data}));
        this.setState({
            articles: store.articles.filter(article => article.userName === store.localStorageQaqData["userName"])
        });
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
                    <button
                        className="setting"
                        onClick={() => redirect("/settings")}>
                        设置
                    </button>
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