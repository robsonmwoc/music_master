# Music Master - Learning ReactJS

This is a `Music` application built using ReactJS integrated with [SemanticUI toolkit](https://react.semantic-ui.com) for learning purposes. It connects to Spotify to search Artists and play sample songs.

The original app, presented in the course [ReactJS and Redux - Mastering Web Apps](https://www.udemy.com/react-js-and-redux-mastering-web-apps/), uses the React Bootstrap. I'm particularly prefering to use SemanticUI more than Bootstrap, it seems better integrated with ReactJS.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Connecting to Spotify API

Recently Spotify changed their rules for access their API. So, you'll need to follow these steps:

* Create a Spotify developer account. You can do it using the OAuth with Facebook;
* Create a new `Integration App` in the Spotify and get the `CLIEND_ID` and `SECRET`;
* Configure the `Integration App` with a callback url, i.e `http://localhost:8888/callback`;
* Clone this repo from Spotify: [web-api-auth-example](https://github.com/spotify/web-api-auth-examples);
* Set the `CLIEND_ID` and `SECRET` from Spotify in the file `/authorization_code/app.js`;
* Enter the folder `/authorization_code` and run `node app.js`;
* Access in the browser and perform the login;
* Finally copy the `ACCESS_TOKEN` from the URL and paste in the `App.jsx` for this app.
