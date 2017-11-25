import { observable, useStrict, action } from "mobx";
import {
    getLocalStorageData
} from "../common/utils";
import {
    GetUserInfo,
    GetArticles
} from "../../services";

type Editor = "富文本" | "Markdown";

interface ArticleData {
    editor: Editor;
    title: string;
    quillVal: string;
    markVal: string;
}

useStrict(true);


const defaultArticleData: ArticleData = {
    editor: "富文本",
    title: "",
    quillVal: "",
    markVal: ""
};

class Store {
    @action.bound public getUserInfo() {
        const qaqData = getLocalStorageData();
        if (qaqData) {
            return   GetUserInfo({userName: qaqData["userName"]});
        }
        return Promise.reject("No login");
    }

    @action.bound public getArticles() {
        const qaqData = getLocalStorageData();
        if (qaqData) {
            return   GetArticles({userName: qaqData["userName"]});
        }
        return Promise.reject("No login");
    }

    @observable public showLoginRegisterModal: boolean = false;
    @action.bound public setShowLoginRegisterModal(data: boolean) {
        if (this.showLoginRegisterModal !== data)
            this.showLoginRegisterModal = data;
    }

    @observable public articleData: ArticleData = defaultArticleData;
    @action.bound public setArticleData(data: Partial<ArticleData>) {
        if (data.title && data.title.length > 50) {
            return;
        }
        if (data.quillVal && data.quillVal.length > 2000) {
            return;
        }
        if (data.markVal && data.markVal.length > 2000) {
            return;
        }
        this.articleData = { ...this.articleData, ...data };
    }
    @action.bound initArticleData() {
        this.articleData = defaultArticleData;
    }
}

export default Store;