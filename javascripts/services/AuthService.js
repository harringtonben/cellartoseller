'use strict';

app.service("AuthService", function ($http, $window, FIREBASE_CONFIG) {
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

  const searchUsers = () => {
    return $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${getCurrentUid()}"`);
  };

  const addUser = () => {

  };

  const createUserObject = (user) => {
    return {
      "email": user.additionalUserInfo.profile.email,
      "name": user.additionalUserInfo.profile.name,
      "picture": user.additionalUserInfo.profile.picture,
      "uid": user.user.uid
    };
  };

  return {authenticateGoogle, isAuthenticated, logout, getCurrentUid, searchUsers, createUserObject};
});