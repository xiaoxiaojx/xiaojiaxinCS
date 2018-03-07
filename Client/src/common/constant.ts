export const TITLE: string = "Awkward Article - 更轻量, 更快速阅读文章的体验";

export const modules = {
    toolbar: [
        [{ "header": [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{"list": "ordered"}, {"list": "bullet"}, {"indent": "-1"}, {"indent": "+1"}],
        ["link", "image"],
        ["clean"]
    ]
};

export const formats = [
    "header",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
    "link", "image"
];