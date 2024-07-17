/* 非同期処理（axiosを使用）*/

import axios from 'axios';

// axiosの規定URLを作るやり方。
export default axios.create({
    baseURL: 'http://localhost:4000',
});
