import * as React from "react";
import {
    Avatar
} from "material-ui";
import {
    redirect
} from "../../common/utils";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import {
    SimpleComment
} from "../../../services";
import "./index.scss";

interface CommentTmpProps {
    comment: SimpleComment;
    index: number;
}

class CommentTmp extends React.PureComponent<CommentTmpProps, {}> {
    render() {
        const { comment, index } = this.props;

        return (
            <div className="CommentTmpWrap">
                <div className="avatar">
                    <Avatar
                        onClick={() => redirect(`/home/${comment.userName}`)}
                        size={40}
                        src={comment.avatar ? comment.avatar : DEFAULT_AVATAR_IMG} />
                    <div className="detail">
                        <div> {comment.nickname} </div>
                        <div>{index + 1}楼 ·  {comment.date} </div>
                    </div>
                </div>
                <div className="commentContent">
                    { comment.content }
                </div>
            </div>
        );
    }
}

export default CommentTmp;