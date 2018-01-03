import * as React from "react";
import { observer } from "mobx-react";
import {
    Toggle
} from "material-ui";
import Store from "../../store";
import chipItems, { ChipType } from "../../common/chips";
import "./index.scss";

interface ChipsProps {
    store: Store;
}

@observer
class Chips extends  React.Component<ChipsProps, {}> {
    getColorProps(chipType: ChipType) {
        const { store } = this.props;
        return chipType === store.filterArticles.chipType ?
            ({
                color: "darkgray"
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
                        <a
                            className="chip"
                            style={this.getColorProps(item.value)}
                            key={index}
                            onClick={ () => this.handleClick(item.value) }>
                            <img
                                src={item.src}
                                className="chipLogo" />
                            <span className="chipLabel">
                                {item.label}
                            </span>
                        </a>
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