import * as React from "react";
import { observer } from "mobx-react";
import {
    Chip,
    Avatar,
    Toggle
} from "material-ui";
import {
   red400
} from "material-ui/styles/colors";
import Store from "../../store";
import chipItems, { ChipType } from "../../common/chips";
import "./index.scss";

interface ChipsProps {
    store: Store;
}

@observer
class Chips extends  React.Component<ChipsProps, {}> {
    getBgcProps(chipType: ChipType) {
        const { store } = this.props;
        return chipType === store.filterArticles.chipType ?
            ({
                backgroundColor: red400
            })
            :
            ({});
    }
    handleClick(chipType: ChipType) {
        const { store } = this.props;
        store.setFilterArticles({ chipType });
    }
    onToggle(event, lookAll) {
        const { store } = this.props;
        store.setFilterArticles({ lookAll });
    }
    render() {
        const { store } = this.props;

        return (
            <div className="ChipsWrap">
                <div className="chipsList">
                {
                    chipItems.map((item, index) =>
                        <Chip
                            className="chip"
                            key={index}
                            onClick={ () => this.handleClick(item.value) }>
                            <Avatar
                                {...this.getBgcProps(item.value)}
                                size={32}>
                                {item.label[0]}
                            </Avatar>
                            <span className="allTag">
                                {item.label}
                            </span>
                        </Chip>
                    )
                }
                </div>
                <div
                    className="toggleWrap">
                    <Toggle
                        className="toggle"
                        disabled={!Boolean(store.localStorageQaqData)}
                        label={store.filterArticles.lookAll ? "所有用户" : "只看自己"}
                        toggled={store.filterArticles.lookAll}
                        defaultToggled
                        onToggle={this.onToggle.bind(this)}
                        labelStyle={{color: "#969696", fontSize: "14px"}}
                        />
                </div>

            </div>
        );
    }
}

export default Chips;