/*
 * @Author: archiecheng archiechengice@outlook.com
 * @Date: 2024-10-10 20:13:15
 * @LastEditors: archiecheng archiechengice@outlook.com
 * @LastEditTime: 2024-10-10 20:32:48
 * @FilePath: \sympifyfuture\src\utils\firebase.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Firebase SDK for v9 and later (modular)
// firebase.js

// 导入 Firebase 模块化 SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyB7Bn4oJiu8mNo4ZdqEfX9xTtIaqi-O1cQ",
    authDomain: "sympify-future.firebaseapp.com",
    projectId: "sympify-future",
    storageBucket: "sympify-future.appspot.com",
    messagingSenderId: "1015323752644",
    appId: "1:1015323752644:web:176de67efbfaaee1ab7191",
    measurementId: "G-M8L84Y5GJ8"
};

// 初始化 Firebase 应用
const app = initializeApp(firebaseConfig);

// 初始化 Firestore 和 Auth
const db = getFirestore(app);
const auth = getAuth(app);

// 导出 Firestore 和 Auth 实例
export { db, auth };

