function getFileExtension(fileName) {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === fileName.length - 1) {
        return '';
    }
    const extension = fileName.slice(lastDotIndex + 1).toLowerCase();
    return extension;
}

function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

let file = undefined;
let encodedImage = '';
let encodedImageExtension = '';

const _image = document.getElementById("image")
const _size = document.getElementById("size")
const _copy = document.getElementById("copy")

function handleImage() {
    file = _image.files[0];
    encodedImageExtension = getFileExtension(file.name)
    _size.innerHTML = "<b>Size</b>&nbsp;" + file.size + "&nbsp;B"
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            encodedImage = e.target.result.split(',')[1];
            console.log(encodedImage)
            window.alert(`1 ${encodedImageExtension.toUpperCase()} Image has been Converted to URL`)
        };
        try {
            reader.readAsDataURL(file);
        } catch (err) {
            window.alert("ERROR: " + err)
        }
    }
}

_image.onchange = () => {
    handleImage();
}

_copy.onclick = () => {
    copyToClipboard(`data:image/${encodedImageExtension};base64,`+encodedImage)
}