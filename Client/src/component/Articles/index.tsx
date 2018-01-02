import * as React from "react";
import * as ReactQuill from "react-quill";
import * as ReactMarkdown from "react-markdown";
import { observer } from "mobx-react";
import {
    RadioButton,
    RadioButtonGroup
} from "material-ui/RadioButton";
import Tooltip from "../Tooltip";
import {
    TextField,
    RaisedButton,
    SelectField,
    Card,
    MenuItem
} from "material-ui";
import Store from "../../store";
import {
    modules,
    formats
} from "../../common/constant";
import * as Chips from "../../common/chips";
import {
    initKeyboardEvent,
    getElementByAttr,
    redirect,
    getFormatDate
} from "../../common/utils";
import {
    User,
    PublishArticleReq,
    PublishArticle,
    UploadImg,
    SetArticle
} from "../../../services";
import "./index.scss";

const NewReactQuill: any = ReactQuill;

interface ArticlesProps {
    store: Store;
}

interface ArticlesState {
    userInfo: Partial<User>;
    tooltip: {
        visible: boolean;
        message: string;
    };
}

@observer
class Articles extends React.Component<ArticlesProps, ArticlesState> {
    state: ArticlesState = {
        userInfo: {},
        tooltip: {
            visible: false,
            message: ""
        }
    };

    componentDidMount() {
        const { store } = this.props;
        store.getUserInfo().then(result => result.data && this.setState({userInfo: result.data}));
        this.addEventListener();
    }
    isDisabled() {
        const { store } = this.props;
        const { articleData } = store;
        const hasTitle = Boolean(articleData.title);
        const hasContent = articleData.editor === "富文本" ?
                articleData.quillVal !== "" :
                articleData.markVal !== "";
        return !(hasTitle && hasContent);
    }
    addEventListener() {
        const uploadImageBtn = document.getElementsByClassName("ql-image")[0];
        if (uploadImageBtn)
            uploadImageBtn.addEventListener("click", () => {
                const hidFileInput: HTMLInputElement = getElementByAttr<HTMLInputElement>("input", "type", "file")[0];
                hidFileInput.addEventListener("change", () => {
                    const file = hidFileInput.files ? hidFileInput.files[0] : "";
                    UploadImg(file)
                        .then(result => {
                            const base64ImgLength = getElementByAttr("img", "src", "data:image/").length;
                            const targetImg: HTMLImageElement = getElementByAttr<HTMLImageElement>("img", "src", "data:image/")[base64ImgLength - 1];
                            targetImg.src = result["data"];
                        });
                });
            });
    }
    handlePublish() {
        const { store } = this.props;
        const qaqData = store.localStorageQaqData;
        if (qaqData) {
            const { userInfo } = this.state;
            const { userName } = userInfo;
            const { articleData, initArticleData, currentEditArticleId } = store;
            const { editor, title, quillVal, markVal, chipType } = articleData;
            const isAddArticle = currentEditArticleId === "";
            const date = getFormatDate();
            const data = {
                title,
                editor,
                content: editor === "富文本" ? quillVal : markVal,
                date,
                userName,
                chipType
            } as PublishArticleReq;
            isAddArticle ?
            PublishArticle(data)
                .then(result => {
                    if (!result.error) {
                        initArticleData();
                        redirect("/");
                        store.getArticles();
                    }
                    this.setState({
                        tooltip: {
                            visible: true,
                            message: result.message
                        }
                    });
                })
            :
            SetArticle({
                id: currentEditArticleId,
                reqData: {
                    title,
                    editor,
                    content: editor === "富文本" ? quillVal : markVal,
                    date,
                    chipType
                }
            }).then(result => {
                if (!result.error) {
                    initArticleData();
                    redirect("/");
                    store.getArticles();
                    store.setCurrentEditArticleId("");
                }
                this.setState({
                    tooltip: {
                        visible: true,
                        message: result.message
                    }
                });
            });
        } else {
            this.setState({
                tooltip: {
                    visible: true,
                    message: "只有登录了才能发表文章哦"
                }
            });
        }
    }
    handleCancel() {
        const { store } = this.props;
        redirect("/");
        store.initArticleData();
        store.setCurrentEditArticleId("");
    }
    render() {
        const { store } = this.props;
        const { tooltip } = this.state;
        const { setArticleData, articleData, currentEditArticleId } = store;
        const { editor, title, quillVal, markVal, chipType } = articleData;
        const ChipsItems = Chips.default.slice(1);

        return (
            <Card className="ArticlesWrap">
                <header>
                    <RadioButtonGroup
                        name="editor"
                        className="editorWrap"
                        valueSelected={editor}
                        onChange={(e: any) => setArticleData({ editor: e.target.value })}>
                        <RadioButton
                            value="富文本"
                            label="富文本"
                        />
                        <RadioButton
                            value="Markdown"
                            label="Markdown"
                        />
                    </RadioButtonGroup>
                </header>
                <section>
                    <div className="title">
                        <TextField
                            floatingLabelText="标题"
                            value={title}
                            onChange={ (e: any) => setArticleData({title: e.target.value}) } />
                    </div>
                    <div className="chipSelect">
                        <label>
                            文章类型
                        </label>
                        <SelectField
                            value={chipType}
                            onChange={(event, index, value) => setArticleData({chipType: value})}>
                            {
                                ChipsItems.map((item, index) =>
                                    <MenuItem
                                        key={index}
                                        value={item.value}
                                        primaryText={item.label}/>
                            )
                            }
                        </SelectField>
                    </div>
                    <div>
                        {
                            editor === "富文本" ?
                            <NewReactQuill
                                modules={modules}
                                formats={formats}
                                theme="snow"
                                value={quillVal}
                                onChange={ value => setArticleData({ quillVal: value }) } />
                            :
                            <div className="markDownWrap">
                                <textarea
                                    onKeyDown={initKeyboardEvent}
                                    value={markVal}
                                    onChange={ (e: any) =>  setArticleData({markVal: e.target.value})} />
                                <ReactMarkdown
                                    className="breakAll"
                                    source={markVal} />
                            </div>
                        }
                    </div>
                </section>
                <footer>
                    {
                        currentEditArticleId === "" ? null :
                        <RaisedButton
                            style={{marginRight: "20px"}}
                            onClick={this.handleCancel.bind(this)}
                            label="取消" />
                    }
                    <RaisedButton
                        disabled={this.isDisabled()}
                        onClick={this.handlePublish.bind(this)}
                        label="发布"
                        primary />
                    <Tooltip
                        visible={tooltip.visible}
                        message={tooltip.message}
                         />
                </footer>
            </Card>
        );
    }
}

export default Articles;