import { observable, useStrict, action } from "mobx";
import {
    getLocalStorageData
} from "../common/utils";
import {
    ChipType
} from "../common/chips";
import {
    GetUserInfo,
    GetArticles,
    GetArticlesRes,
    User,
    PublishArticlesRes
} from "../../services";

type Editor = "富文本" | "Markdown";

interface ArticleData {
    editor: Editor;
    title: string;
    quillVal: string;
    markVal: string;
    chipType: ChipType;
}

interface FilterArticles {
    title: string;
    chipType: ChipType;
    lookAll: boolean;
}

useStrict(true);


const defaultArticleData: ArticleData = {
    editor: "富文本",
    title: "",
    quillVal: "",
    markVal: "",
    chipType: ChipType.Prose
};

class Store {
    constructor() {
        this.getLocalStorageQaqData();
        this.getArticles();
    }
    @observable public userInfo: Partial<User> | boolean = false;
    @action.bound public getUserInfo(userName?: string) {
        const qaqData = this.localStorageQaqData;
        if (qaqData || userName) {
            return   GetUserInfo({userName: userName ? userName : qaqData["userName"]})
                .then(result => {
                    if (result.data) {
                        this.userInfo = result.data;
                    }
                    return result;
                });
        }
        return Promise.reject("No login");
    }

    @observable public loadingIndexPage: boolean = false;

    @observable public articles: PublishArticlesRes[] = [];
    @observable public cpArticles: PublishArticlesRes[] = [];
    @action.bound public getArticles(self?: boolean) {
        this.loadingIndexPage = true;
        const qaqData = this.localStorageQaqData;
        const filter = self ? { userName: qaqData["userName"] } : {};
        return GetArticles(filter)
            .then(action(
                (result: GetArticlesRes) => {
                    this.loadingIndexPage = false;
                    if (result.data) {
                        this.articles = result.data.reverse();
                        this.cpArticles = result.data;
                        localStorage.setItem("articlesData", JSON.stringify(this.articles));
                    }
                    return result;
                }
            ));
    }
    @observable public filterArticles: FilterArticles = {
        title: "",
        chipType: ChipType.All,
        lookAll: true
    };
    @action.bound public setFilterArticles(data: Partial<FilterArticles>, includes: boolean = true) {
        this.filterArticles = {...this.filterArticles, ...data};
        this.articles = this.cpArticles
            .filter(art => {
                const chipType = art.chipType ? art.chipType : ChipType.Prose;
                return (includes ?
                    art.title.includes(this.filterArticles.title)
                    :
                    art.title === this.filterArticles.title
                )
                &&
                (this.filterArticles.chipType === ChipType.All ?
                    true
                    :
                    this.filterArticles.chipType === chipType
                )
                &&
                (this.filterArticles.lookAll ?
                    true
                    :
                    art.userName === this.localStorageQaqData["userName"]
                );
            });
    }

    @observable public showLoginRegisterModal: boolean = false;
    @action.bound public setShowLoginRegisterModal(data: boolean) {
        if (this.showLoginRegisterModal !== data)
            this.showLoginRegisterModal = data;
    }

    @observable public currentEditArticleId: string = "";
    @action.bound public setCurrentEditArticleId(id: string) {
        this.currentEditArticleId = id;
    }
    @observable public articleData: ArticleData = defaultArticleData;
    @action.bound public setArticleData(data: Partial<ArticleData>) {
        if (data.title && data.title.length > 50) {
            return;
        }
        if (data.quillVal && data.quillVal.length > 10000) {
            return;
        }
        if (data.markVal && data.markVal.length > 10000) {
            return;
        }
        this.articleData = { ...this.articleData, ...data };
    }
    @action.bound initArticleData() {
        this.articleData = defaultArticleData;
    }

    @observable public localStorageQaqData: Partial<User> | boolean = false;
    @action.bound public setLocalStorageQaqData(data: Partial<User> | boolean) {
        localStorage.setItem("qaqData", JSON.stringify(data));
        this.localStorageQaqData = data ? { avatar: this.userInfo["avatar"], ...(data as any)} : false;
    }
    @action.bound public getLocalStorageQaqData() {
        const data = getLocalStorageData();
        this.localStorageQaqData = data;
        if (data) {
            this.getUserInfo(data["userName"])
                .then(action(
                    result => {
                        this.localStorageQaqData = {avatar: result["data"].avatar, ...(data as any)};
                    }
                ));
        }
    }
}

export default Store;