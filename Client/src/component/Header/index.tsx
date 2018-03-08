import * as React from "react";
import {
	Popover,
	Menu,
	MenuItem,
} from "material-ui";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import ActionHome from "material-ui/svg-icons/action/home";
import Settings from "material-ui/svg-icons/action/settings";
import SignOut from "material-ui/svg-icons/action/exit-to-app";
import chipItems from "../../common/chips";
import Store, { ScrollDirection } from "../../store";
import {
	autoBindMethods,
	getCompleteImgUrl
} from "../../common/utils";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import "./index.scss";

enum ShowModal {
	No = "No",
	Settings = "Settings"
}

interface HeaderProps {
	store?: Store;
}

interface HeaderState {
	showModal: ShowModal;
	anchorEl: JSX.Element | null;
}

@inject("store")
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
		anchorEl: null
	};

	setShowModal(showModal: ShowModal) {
		this.setState({
			showModal,
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
        const { showModal, anchorEl } = this.state;
		const store = this.props.store!;
		const data = store.localStorageQaqData;
		const toHome = data ? `/home/${data["userName"]}` : `/`;
		const className =
			store.scrollY > 150 ?
				store.direction === ScrollDirection.DOWN ? "HeaderWrap absoluteHeader" : "HeaderWrap fixedHeader"
			:
			"HeaderWrap fixedHeader";

        return (
            <div className={className}>
                <div className="main">
                    <div className="logo">
                        <div className="logoMain">
                            <img src="/staticImage/32logo.png" alt="logo"/>
                            <div className="dividing"/>
                            <span>Awkward Article</span>
                        </div>
                        <div className="welcome">
							<Link to="/write" className="writeArticle">
								<span>写文章</span>
								<img src="/staticImage/write.png" />
							</Link>
							{
								data ?
								<img
									className="avatar"
									src={data["avatar"] ? getCompleteImgUrl(data["avatar"]) : DEFAULT_AVATAR_IMG }
									onClick={this.onClickSettings} />
								:
								<a
									onClick={ () => store.setShowLoginRegisterModal(true) }>
									登录
								</a>
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
											<Link to={toHome}> 主页 </Link>
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
                    </div>
                    <nav>
                        {
                            chipItems.map((item, index) =>
							<Link to="/">
								<span
									key={index}
									style={{color:
										item.value === store.filterArticles.chipType ? "rgba(0,0,0,.78)" : "rgba(0,0,0,.54)"
									}}
									onClick={() => store.setFilterArticles({chipType: item.value})}>
									{ item.label }
								</span>
							</Link>)
                        }
                    </nav>
                </div>
            </div>
        );
    }
}

export default Header;