import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "material-ui/Card";
import ISearch from "material-ui/svg-icons/action/search";
import ArticleTmp from "../ArticleTmp";
import LikeListTmp from "../LikeListTmp";
import {
    CircularProgress,
    AutoComplete,
} from "material-ui";
import {
    redirect
} from "../../common/utils";
import Store from "../../store";
import "./index.scss";

interface IndexProps {
    store: Store;
}

interface IndexState {
}

@observer
class Index extends React.Component<IndexProps, IndexState> {
    getLikeList() {
        const { cpArticles } = this.props.store;
        return cpArticles.sort((a, b) => b.like - a.like)
            .slice(0, 3);
    }
    render() {
        const { store } = this.props;
        const likeList = this. getLikeList();

        return (
            <Card className="IndexWrap">
                <header>
                </header>
                <section>
                    {
                        store.loadingIndexPage ?
                        <CircularProgress
                            className="progress"
                            size={100}
                            thickness={5} />
                        :
                        <div className="indexArticles">
                            <div className="articlesList">
                            {
                                store.articles.map((article, index) =>
                                <ArticleTmp key={index} article={article}/>
                                )
                            }
                            </div>
                            <div>
                                <div className="search">
                                    <AutoComplete
                                        value={store.searchArticlesTitle}
                                        onUpdateInput={val => store.setSearchArticlesTitle(val)}
                                        onNewRequest={val => store.realSearchArticlesTitle(val)}
                                        dataSource={store.articles.map(art => art.title)}
                                        hintText="请输入文章标题"
                                        floatingLabelText="搜索文章" />
                                    <ISearch />
                                </div>
                                <div className="other">
                                    <a onClick={() => redirect("/about")}>
                                        <img src="http://upload-images.jianshu.io/upload_images/2738521-72b26ecb7788fa6c.jpg"/>
                                    </a>
                                </div>
                                <div className="readList">
                                    <div>点赞·排行</div>
                                    <div>
                                        {
                                            likeList.map((item, index) =>
                                            <LikeListTmp data={item} key={index}/>
                                        )
                                        }
                                    </div>
                                </div>
                                <div className="contact">
                                    <div>联系·我们</div>
                                    <div>邮箱 784487301@qq.com</div>
                                </div>
                                <div className="contact">
                                    <div>其他·信息</div>
                                    <div>
                                        <a href="https://github.com/xiaoxiaojx">
                                            <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="32"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </section>
            </Card>
        );
    }
}

export default Index;