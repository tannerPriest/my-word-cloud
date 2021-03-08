import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOM,
    databaseURL: process.env.REACT_APP_DATA_URL ,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.time = app.firestore.FieldValue.serverTimestamp()
        this.user = false;
    }

    updateWords = async (newWords) => {
        this.db.collection('wordCollection').doc("record").update(newWords)
            .then((res) => {
                console.log(res)
                return true
            })
            .catch((e) => {
                console.error(e)
                return false
            });
    }

    getWords = async () => {
        try {
            const docRef = this.db.collection('wordCollection').doc("record")
            const data = await docRef.get()
            if (data.exists) {
                return data.data()
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

const firebase = new Firebase()

export default firebase