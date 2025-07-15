// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApX9kiQDfdOAHFlHd-Qvk-owdo50wm2R0",
    authDomain: "confession-c9074.firebaseapp.com",
    projectId: "confession-c9074",
    storageBucket: "confession-c9074.firebasestorage.app",
    messagingSenderId: "707113951953",
    appId: "1:707113951953:web:84f70ddea9b8725368dbf0",
    measurementId: "G-0P1LG22GQY"
};

// Initialize Firebase
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// Function to save response to Firebase
async function saveResponseToFirebase(response) {
    try {
        if (!db) {
            console.warn('⚠️ Firebase not initialized, using localStorage only');
            localStorage.setItem('herResponse', response);
            localStorage.setItem('responseTime', new Date().toLocaleString());
            return;
        }

        const responseData = {
            response: response,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            date: new Date().toLocaleString(),
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        await db.collection('responses').add(responseData);
        console.log('✅ Response saved to Firebase:', responseData);
        
        // Also save to localStorage as backup
        localStorage.setItem('herResponse', response);
        localStorage.setItem('responseTime', new Date().toLocaleString());
        
    } catch (error) {
        console.error('❌ Error saving to Firebase:', error);
        // Fallback to localStorage
        localStorage.setItem('herResponse', response);
        localStorage.setItem('responseTime', new Date().toLocaleString());
    }
}

// Function to get all responses from Firebase
async function getResponsesFromFirebase() {
    try {
        if (!db) {
            console.warn('⚠️ Firebase not initialized, returning empty array');
            return [];
        }

        const snapshot = await db.collection('responses').orderBy('timestamp', 'desc').get();
        const responses = [];
        snapshot.forEach(doc => {
            responses.push({
                id: doc.id,
                ...doc.data()
            });
        });
        console.log('📊 All responses from Firebase:', responses);
        return responses;
    } catch (error) {
        console.error('❌ Error getting responses from Firebase:', error);
        return [];
    }
}

// Function to get the latest response
async function getLatestResponse() {
    try {
        if (!db) {
            console.warn('⚠️ Firebase not initialized, returning null');
            return null;
        }

        const snapshot = await db.collection('responses').orderBy('timestamp', 'desc').limit(1).get();
        if (!snapshot.empty) {
            const latestResponse = snapshot.docs[0].data();
            console.log('📊 Latest response from Firebase:', latestResponse);
            return latestResponse;
        }
        return null;
    } catch (error) {
        console.error('❌ Error getting latest response from Firebase:', error);
        return null;
    }
} 