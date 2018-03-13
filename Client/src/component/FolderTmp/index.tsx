import * as React from "react";
import "./index.scss";

interface FolderTmpProps {
    folders: {
        name: string;
        total?: number;
    }[];
    folder: string;
    onChange: (val: string) => void;
}

export default function FolderTmp (props: FolderTmpProps) {
    return (
        <div className="FolderTmpWrap">
            {
                props.folders.map((item, index) =>
                <span
                    key={index}
                    onClick={ val => props.onChange(item.name) }
                    className={props.folder === item.name ?  "folderItem highlightColor" : "folderItem"} >
                    { item.name || "全部" } ( { item.total } )
                </span>
                )
            }
        </div>
    );
}