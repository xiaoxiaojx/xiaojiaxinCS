import * as React from "react";
import {
    Avatar,
    IconButton
} from "material-ui";
import IFavorite from "material-ui/svg-icons/action/favorite";
import {
    redirect, getCompleteImgUrl
} from "../../common/utils";
import {
    PublishArticlesRes
} from "../../../services";
import "./index.scss";

interface LikeListTmpProps {
    data: PublishArticlesRes;
}

class LikeListTmp extends React.Component<LikeListTmpProps, {}> {
    render() {
        const { data } = this.props;
        return (
            <div className="LikeListTmpWrap">
                <IconButton
                    onClick={() => redirect(`/home/${data.userName}`)}
                    tooltip="点击进入我的主页">
                    <Avatar
                        src={getCompleteImgUrl(data.avatar)}
                        size={30}/>
                </IconButton>
                <div>
                    <a
                        onClick={() => redirect(`/article/${data["_id"]}`)}
                        className="likeTitle">
                        {data.title}
                    </a>
                    <div className="likeTotal">
                        <span>
                            作者: {data.nickname}
                        </span>
                        <span> { data.like }个喜欢 </span>
                        <IFavorite />
                    </div>
                </div>
            </div>
        );
    }
}

export default LikeListTmp;