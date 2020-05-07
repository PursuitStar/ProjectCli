// import Api from '@/plugins/axios'

// 获取用户token
export function getToken() {

    let token = sessionStorage.getItem('token');

    if (!token) {
        let userInfo = localStorage.getItem('user');
        if (userInfo) {
            token = JSON.parse(userInfo).user_token || '';
        }
    }
    return token
}