/**
 * Desc: 工具函数
 */


/* --- 设备环境判断 --- */

// 是否微信环境
export const isWeixn = () => {
    let ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger'
}

// 是否IOS环境
export const isIos = () => {
    let ua = navigator.userAgent;
    return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

// 是否Android环境
export const isAndroid = () => {
    let ua = navigator.userAgent;
    return ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1
}



/* --- request 请求相关 --- */

/**
 * 删除重复请求：确保前一次的请求发送之后才能再此次发起请求
 * @param {Map} requestMap 区分唯一请求的Map对象键值保存对
 * @param {Object} config 请求配置项
 * @param {Object} qs 将嵌套对象转换为query的工具
 * @param {Function} CancelToken 取消请求实例
 */
export const delRepeatHttpRequest = (requestMap, config, qs, CancelToken) => {
    let {
        url,
        method,
        params = {},
        data,
    } = config;
    const keyString = qs.stringify(
        Object.assign({}, {
                url,
                method
            },
            params, {
                data
            }
        )
    );
    if (requestMap.get(keyString)) {
        // 取消当前请求
        config.cancelToken = new CancelToken((cancel) => {
            cancel({
                type: 'cancelHttp',
                msg: 'Please slow down a little'
            });
        });
    }
    requestMap.set(keyString, true);
    Object.assign(config, {
        _keyString: keyString
    });
};


/* --- file 文件相关 --- */

// blob文件流转化文件
export const blobToFile = (res, fileName) => {
    let blob = new Blob([res]);
    let downloadElement = document.createElement("a");
    let href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = fileName; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
}

// 压缩图片
export const resizeImage = (file, maxW = 1600, maxH = 1600) => {
    return new Promise(function (resolve) {
        let reader = new FileReader();

        reader.onload = function () {
            let img = new Image();

            img.onload = function () {
                let w = this.naturalWidth;
                let h = this.naturalHeight;

                // 如果图片尺寸小于最大限制，则不压缩直接上传
                if (w <= maxW && h <= maxH) {
                    resolve(file);
                    return;
                }

                let level = 0.8;
                let multiple = Math.max(w / maxW, h / maxH);
                let resizeW = parseInt(w / multiple);
                let resizeH = parseInt(h / multiple);

                let canvas = document.createElement("canvas");

                canvas.width = resizeW;
                canvas.height = resizeH;

                let ctx = canvas.getContext("2d");

                ctx.drawImage(img, 0, 0, resizeW, resizeH);

                let base64Img = canvas.toDataURL(file.type, level);

                // 将图片的 base64位转化为blob
                let res = dataURLtoFile(base64Img, file.name, file.type);
                resolve(res);

            };

            img.src = this.result;
        };

        reader.readAsDataURL(file);
    });
}

// 将base64字符串转化为 file 对象
export const dataURLtoFile = (dataURL, fileName, fileType) => {
    let arr = dataURL.split(','),
        // mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {
        type: fileType || 'image/jpg'
    });
}

// 是否图片类型文件
export const isImage = (file) => {
    let fileName = file.name;

    // 文件类型 （小写转大写）
    if (fileName) {
        let path_index = fileName.lastIndexOf(".");
        fileName = fileName.substring(path_index + 1).toUpperCase();
    }
    // 常用图片格式大全
    let imgAcceptArr = [
        "BMP",
        "JPG",
        "PNG",
        "JPEG",
        "TIF",
        "GIF",
        "PCX",
        "TGA",
        "EXIF",
        "FPX",
        "SVG",
        "PSD",
        "CDR",
        "PCD",
        "DXF",
        "UFO",
        "EPS",
        "AI",
        "RAW",
        "WMF",
        "WEBP"
    ];

    // 检索图片类型是否匹配
    return imgAcceptArr.indexOf(fileName) > -1
}


/* --- 工具函数 --- */
// 复制到粘贴板
export const copyToClipboard = (text) => {
    var input = document.createElement('input');
    input.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
    input.setAttribute('value', text);
    document.body.appendChild(input);
    // input.setSelectionRange(0, 9999);
    input.select();
    var res = document.execCommand('copy');
    document.body.removeChild(input);
    return res;
}


// 请求路径过滤
export const urlHandle = (BaseUrl, url) => {
    let resultUrl = '';
    if (typeof BaseUrl == 'string' && typeof url == 'string') {
        if (BaseUrl.charAt(BaseUrl.length - 1) == '/') {
            BaseUrl = BaseUrl.substring(0, BaseUrl.length - 1)
        }
        if (url.charAt(0) == '/') {
            url = url.substring(1, url.length)
        }
        resultUrl = BaseUrl + '/' + url;
    }
    return resultUrl
}


/* --- 业务相关 --- */

// 是否第三方进入
export const hasOrigin = () => {
    let origin = window.sessionStorage.getItem('origin');
    if (['ios', 'android', 'wechat'].includes(origin)) {
        return true
    } else {
        return false
    }
}