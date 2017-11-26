class Authenticator {
  constructor() {
    this.client_id = process.env.SPOTIFY_CLIENT_ID
    this.secret = process.env.SPOTIFY_SECRET
  }

  authorize() {
    app.get('/login', function(req, res) {
var scopes = 'user-read-private user-read-email';
res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + my_client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
});
  }
}
