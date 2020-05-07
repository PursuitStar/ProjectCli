const regExpConfig = {
    notEmpty: /^[^\s]+$/, //不含空格
    Phone: /^(1[3-9])\d{9}$/, //手机号
    IdCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证
    IsEmail: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, //邮箱
};
export default regExpConfig;