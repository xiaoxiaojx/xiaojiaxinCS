export enum ChipType {
    All = "首页",
    Blog = "博客",
    Prose = "散文",
    Notepad = "记事本",
    Other = "其他"
}

interface ChipItems {
    label: string;
    value: ChipType;
//    src: string;
}

const chipItems: ChipItems[] = [{
    label: "首页",
    value: ChipType.All,
//    src: "./staticImage/Dog_31.869387755102px_1198238_easyicon.net.png",
}, {
    label: "博客",
    value: ChipType.Blog,
//    src: "./staticImage/Dog_32px_1183911_easyicon.net.png"
}, {
    label: "散文",
    value: ChipType.Prose,
//    src: "./staticImage/dog_21.045454545455px_1208433_easyicon.net.png"
}, {
    label: "记事本",
    value: ChipType.Notepad,
//    src: "./staticImage/dog_20.576744186047px_1208383_easyicon.net.png"
}, {
    label: "其他",
    value: ChipType.Other,
//    src: "./staticImage/shepherd_dog_32px_1165309_easyicon.net.png"
}];

export default chipItems;