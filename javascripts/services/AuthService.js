'use strict';

app.service("AuthService", function ($window, FIREBASE_CONFIG) {
  const authenticateGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const isAuthenticated = () => {
    return getCurrentUid() ? true : false;
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  const getCurrentUid = () => {
    const localStorageKey = `firebase:authUser:${FIREBASE_CONFIG.apiKey}:[DEFAULT]`;
    const localStorageValue = $window.localStorage[localStorageKey];
    if(localStorageValue){
      return JSON.parse(localStorageValue).uid;
    }
    return false;
  };

  return { authenticateGoogle, isAuthenticated, logout, getCurrentUid };
});