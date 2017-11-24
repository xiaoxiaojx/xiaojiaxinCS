import * as React from "react";
import { FlatButton, Popover, Menu, MenuItem, RaisedButton } from "material-ui";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import ActionHome from "material-ui/svg-icons/action/home";
import Settings from "material-ui/svg-icons/action/settings";
import SignOut from "material-ui/svg-icons/action/exit-to-app";
import Tooltip from "../Tooltip";
import Store from "../../store";
import {
	getLocalStorageData,
	autoBindMethods
} from "../../common/utils";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import "./index.scss";

enum ShowModal {
	No = "No",
	LogoDialog = "LogoDialog",
	Settings = "Settings"
}

enum FocusNavBtn {
	Home = "Home",
	Article = "Article",
	AboutUs = "AboutUs",
	Github = "Github"
}

interface HeaderProps {
	store: Store;
}

interface HeaderState {
	showModal: ShowModal;
	focusNavBtn: FocusNavBtn;
	anchorEl: JSX.Element | null;
}

@observer
class Header extends React.Component<HeaderProps, HeaderState> {
	constructor(props) {
		super(props);
		autoBindMethods([
			"closeShowModal", "onClickSettings", "signOut"
		], this);
	}
	state: HeaderState = {
		showModal: ShowModal.No,
		focusNavBtn: FocusNavBtn.Home,
		anchorEl: null
	};
	setShowModal(showModal: ShowModal) {
		this.setState({
			showModal,
		});
	}
	setFocusNavBtn(focusNavBtn: FocusNavBtn) {
		this.setState({
			focusNavBtn,
		});
	}
	closeShowModal() {
		this.setState({
			showModal: ShowModal.No,
		});
	}
	onClickSettings(event) {
		event.preventDefault();
		this.setState({
			showModal: ShowModal.Settings,
			anchorEl: event.currentTarget,
		});
	}
	signOut() {
		try {
			localStorage.removeItem("qaqData");
		} catch (err) {}
		location.reload();
	}
	render() {
		const { showModal, focusNavBtn, anchorEl } = this.state;
		const { store } = this.props;
		const data = getLocalStorageData();

        return (
            <div className="HeaderWrap">
                <div className="logo">
					<FlatButton
						label=" "
						primary={true}
						onClick={ () => this.setShowModal(ShowModal.LogoDialog) }>
					</FlatButton>
					<Tooltip
						visible={showModal === ShowModal.LogoDialog}
						message="Hello Word" />
                </div>
                <div className="welcome">
					{
						data ?
						<img
							className="avatar"
							src={data["avatar"] ? data["avatar"] : DEFAULT_AVATAR_IMG }
							onClick={this.onClickSettings} />
						:
						<FlatButton
							label="登录/注册"
							primary
							onClick={ () => store.setShowLoginRegisterModal(true) }/>
					}
					<Popover
						open={showModal === ShowModal.Settings}
						anchorEl={anchorEl as any}
						anchorOrigin={{horizontal: "left", vertical: "bottom"}}
						targetOrigin={{horizontal: "left", vertical: "top"}}
						onRequestClose={this.closeShowModal}
						>
						<Menu>
							<MenuItem>
								<div className="personalMenu">
									<ActionHome />
									<Link to="/home"> 主页 </Link>
								</div>
							</MenuItem>
							<MenuItem>
								<div className="personalMenu">
									<Settings />
									<Link to="/settings"> 设置 </Link>
								</div>
							</MenuItem>
							<MenuItem
								onClick={this.signOut}>
								<div className="personalMenu">
									<SignOut />
									<span> 退出 </span>
								</div>
							</MenuItem>
						</Menu>
					</Popover>
                </div>
                <nav className="nav">
					<Link to="/">
						<RaisedButton
							label="首页"
							primary={focusNavBtn === FocusNavBtn.Home}
							onClick={() => this.setFocusNavBtn(FocusNavBtn.Home)}/>
					</Link>
					<Link to="/articles">
						<RaisedButton
							label="文章"
							primary={focusNavBtn === FocusNavBtn.Article}
							onClick={() => this.setFocusNavBtn(FocusNavBtn.Article)}/>
					</Link>
					<Link to="/about">
						<RaisedButton
							label="关于我们"
							primary={focusNavBtn === FocusNavBtn.AboutUs}
							onClick={() => this.setFocusNavBtn(FocusNavBtn.AboutUs)}/>
					</Link>
					<a href="https://github.com/xiaoxiaojx">
						<RaisedButton
							label="Github"
							primary={focusNavBtn === FocusNavBtn.Github}
							onClick={() => this.setFocusNavBtn(FocusNavBtn.Github)}/>
					</a>
                </nav>
            </div>
        );
    }
}

export default Header;