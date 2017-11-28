const MAX_WIDTH = 800;

export const fileToBase64ByQuality = (file, quality) => {
    const fileReader = new FileReader();
    const type = file.type;

    return new Promise((resolve, reject) => {
        fileReader.onload = () => {
            resolve(compress(fileReader.result, quality, type));
        };
        fileReader.onerror = (e) => {
            reject(e);
        };
        fileReader.readAsDataURL(file);
    });
};

export const compress = (base64, quality, mimeType) => {
    let cvs = document.createElement("canvas");
    let img = document.createElement("img");
    img.crossOrigin = "anonymous";
    return new Promise((resolve, reject) => {
        img.src = base64;
        img.onload = () => {
            if (img.width > MAX_WIDTH) {
                cvs.width = MAX_WIDTH;
                cvs.height = img.height * MAX_WIDTH / img.width;
            } else {
                cvs.width = img.width;
                cvs.height = img.height;
            }
            let imageData = cvs.toDataURL(mimeType, quality / 100);
            resolve(imageData);
        };
}); };

export const convertBase64UrlToBlob = (base64, mimeType) => {
    const bytes = window.atob(base64.split(",")[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    let _blob = new Blob([ab], { type: mimeType });
    return _blob;
};
