export enum ChipType {
    All = "全部文章",
    Blog = "博客",
    Prose = "散文",
    Notepad = "记事本",
    Other = "其他"
}

interface ChipItems {
    label: string;
    value: ChipType;
}

const chipItems: ChipItems[] = [{
    label: "全部文章",
    value: ChipType.All
}, {
    label: "博客",
    value: ChipType.Blog
}, {
    label: "散文",
    value: ChipType.Prose
}, {
    label: "记事本",
    value: ChipType.Notepad
}, {
    label: "其他",
    value: ChipType.Other
}];

export default chipItems;