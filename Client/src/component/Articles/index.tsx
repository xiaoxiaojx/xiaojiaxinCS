import * as React from "react";
import * as ReactQuill from "react-quill";
import * as ReactMarkdown from "react-markdown";
import * as moment from "moment";
import { observer } from "mobx-react";
import {
    Card
} from "material-ui/Card";
import {
    RadioButton,
    RadioButtonGroup
} from "material-ui/RadioButton";
import Tooltip from "../Tooltip";
import {
    TextField,
    RaisedButton
} from "material-ui";
import Store from "../../store";
import {
    modules,
    formats
} from "../../common/constant";
import {
    initKeyboardEvent
} from "../../common/utils";
import {
    User,
    PublishArticleReq,
    PublishArticle
} from "../../../services";
import "./index.scss";

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
        store.getUserInfo().then(result => this.setState({userInfo: result.data}));
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
    handlePublish() {
        const { store } = this.props;
        const qaqData = store.localStorageQaqData;
        if (qaqData) {
            const { userInfo } = this.state;
            const { userName, nickname,  avatar} = userInfo;
            const { articleData, initArticleData } = store;
            const { editor, title, quillVal, markVal } = articleData;
            const date = moment(new Date()).format("YYYY-MM-DD hh:mm");
            const data: PublishArticleReq = {
                title,
                editor,
                content: editor === "富文本" ? quillVal : markVal,
                date,
                userName,
                nickname,
                avatar
            };
            PublishArticle(data)
                .then(result => {
                    if (!result.error) {
                        initArticleData();
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
    render() {
        const { store } = this.props;
        const { tooltip } = this.state;
        const { setArticleData, articleData } = store;
        const { editor, title, quillVal, markVal } = articleData;

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
                    <h1>
                        <TextField
                            floatingLabelText="标题"
                            value={title}
                            onChange={ (e: any) => setArticleData({title: e.target.value}) } />
                    </h1>
                    <div>
                        {
                            editor === "富文本" ?
                            <ReactQuill
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
                                    source={markVal} />
                            </div>
                        }
                    </div>
                </section>
                <footer>
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