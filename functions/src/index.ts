import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// テスト用のHTTP関数
export const helloWorld = functions
  .region('asia-northeast1')
  .https
  .onRequest((request, response) => {
    response.json({ message: "Hello from Firebase!" });
  });
