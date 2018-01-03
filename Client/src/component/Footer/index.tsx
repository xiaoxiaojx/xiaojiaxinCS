import * as React from "react";
import { observer } from "mobx-react";
import {
    Tabs,
    Tab
}  from "material-ui";
import Login from "../Login";
import Register from "../Register";
import BackTop from "../BackTop";
import Store from "../../store";
import Modal from "../Modal";
import {
    autoBindMethods,
    redirect
} from "../../common/utils";
import {
    TITLE
} from "../../common/constant";
import "./index.scss";

interface FooterProps {
    store: Store;
}

interface FooterState {
    visible: boolean;
}

@observer
class Footer extends React.Component<FooterProps, FooterState> {
    constructor(props) {
        super(props);
        autoBindMethods(["onOkM1", "onCancelM1", "onCancelM2"], this);
    }
    state: FooterState = {
        visible: false
    };

    componentDidMount() {
        this.showModal1();
    }
    showModal1() {
        const { store } = this.props;
        const qaqData = store.localStorageQaqData;
        this.setState({
            visible: !qaqData
        });
    }
    onOkM1() {
        const { store } = this.props;
        const cb = () => {
            redirect("/");
            store.setShowLoginRegisterModal(true);
        };
        this.setState({
            visible: false
        }, cb);
    }
    onCancelM1() {
        this.setState({
            visible: false
        });
    }
    onCancelM2() {
		const { store } = this.props;
		store.setShowLoginRegisterModal(false);
	}
    render() {
        const { store } = this.props;
        const { visible } = this.state;

        return (
            <div className="FooterWrap">
                <section>
                    <div className="baseline">
                        <div className="bottomLogo">
                            <img src="/staticImage/dog24.png"/>
                            <div className="bigBottomLogo">
                                <img
                                    src="/staticImage/dog128.png"/>
                                <span>
                                    Wish you a happy year of dog
                                </span>
                            </div>
                        </div>
                        <span>Remember this is my bottom line </span>
                    </div>
                    <BackTop />
                </section>
                <footer>
                    <Modal
                        title={
                            <h3
                                style={{textAlign: "center"}}>
                                    欢迎您,  (｡･∀･)ﾉﾞ 请先登录~
                            </h3>
                        }
                        okText="O(∩_∩)O 好的"
                        cancelText="╮(╯﹏╰)╭ 下次再说"
                        visible={visible}
                        onOk={this.onOkM1}
                        onCancel={this.onCancelM1}>
                            <div className="loginLogo">
                                <img
                                    src="/staticImage/dog.png"/>
                                <h3>{ TITLE }</h3>
                            </div>
                    </Modal>
                    <Modal
                        visible={store.showLoginRegisterModal}
                        onCancel={this.onCancelM2}
                        >
                        <Tabs>
                            <Tab label="登录" >
                                <Login
                                    store={store} />
                            </Tab>
                            <Tab label="注册" >
                                <Register
                                    store={store} />
                            </Tab>
                        </Tabs>
                    </Modal>
                </footer>
            </div>
        );
    }
}

export default Footer;