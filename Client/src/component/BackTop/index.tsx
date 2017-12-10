import * as React from "react";
import {
    IconButton,
    Card
} from "material-ui";
import IArrowUp from "material-ui/svg-icons/navigation/arrow-drop-up";
import {
    autoBindMethods,
    throttle
} from "../../common/utils";
import "./index.scss";

interface BackTopState {
    isHidden: boolean;
}

class BackTop extends React.Component<{}, BackTopState> {
    constructor(props) {
        super(props);
        autoBindMethods(["scrollHandle", "throttleFuc"], this);
    }
    state: BackTopState = {
        isHidden: true
    };
    componentDidMount() {
        this.addEventListener();
        this.scrollHandle();
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.throttleFuc());
    }
    throttleFuc() {
        return throttle(this.scrollHandle);
    }
    addEventListener() {
        window.addEventListener("scroll", this.throttleFuc(), false);
    }
    setIsHidden(isHidden: boolean) {
        if (this && isHidden !== this.state.isHidden) {
            this.setState({ isHidden });
        }
    }
    scrollHandle() {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            this.setIsHidden(false);
        }
        else {
            this.setIsHidden(true);
        }
    }
    render() {
        const { isHidden } = this.state;

        return (
            <Card
                style={{display: isHidden ? "none" : "block"}}
                className="BackTopWrap">
                <IconButton
                    tooltip="回到顶部"
                    onClick={() => window.scrollTo(0, 0)}>
                    <IArrowUp />
                </IconButton>
            </Card>
        );
    }
}

export default BackTop;