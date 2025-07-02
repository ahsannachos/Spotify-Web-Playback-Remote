# Spotify Web Player App
A web-based Spotify remote player built with the [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/) and JavaScript.  
This project allows you to authenticate with Spotify, control playback, view album art, and see the upcoming queue—all from your browser, in simple its a music player app that allows you to listen songs and those songs are being played by by your Spotify account because we are using SPotify API.

---

## Features

- **Spotify OAuth2 PKCE Authentication**  
  Secure login flow using PKCE for public clients.

- **Web Playback SDK Integration**  
  Control playback (play/pause, next, previous) directly in the browser.

- **Album Art & Song Info**  
  Displays current track’s album art and name.

- **Seekbar**  
  Shows playback progress and allows seeking.

- **Queue List**  
  Shows upcoming tracks.

- **Responsive UI**  
  Styled with Tailwind CSS for a modern look.

---

## Getting Started

### Prerequisites

- A [Spotify Developer account](https://developer.spotify.com/dashboard/)
- A registered Spotify app with a redirect URI set to `http://127.0.0.1:3000/callback.html`
- A local server (e.g., [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code)

### Setup

1. **Clone this repository**

   ```sh
   git clone https://github.com/yourusername/spotify-web-remote.git
   cd spotify-web-remote
   
2. **Configure your Spotify Client ID**
   
Open `login.html` and `callback.html`
Replace the `client_id` value with your Spotify app’s client ID.

3. **Start a local server**
   
Use Python for the server, type `python -m http.server 3000` on the VSCode terminal

4. **Open `login.html` in your browser**
   
Click "Login with Spotify" to start the authentication flow.

5. **Choose Spotify Remote Player from Spotify App**

Now open your spotify app on phone or browser, and from the playback, choose **"Spotify Remote Player"** and boom then your music will be start playing from this web music player and you will see currently playing music name, cover image, que songs along with music controls. Thanks!

### File Structure
```sh
.
├── login.html                # Login and PKCE code challenge generation
├── callback.html             # Handles Spotify redirect and token exchange
├── Spotify Remote (2).html   # Main player UI
```
### How It Works
1. **Login Flow**

- User clicks "Login with Spotify" (`login.html`)
- Generates a PKCE code verifier and challenge
- Redirects to Spotify authorization endpoint

2. **Callback Handling**

- Spotify redirects back to `callback.html` with a code in the URL
- Exchanges the code and verifier for an access token
- Stores the access token in localStorage

3. **Web Playback**

- Loads `Spotify Remote (2).html`
- Initializes the Spotify Web Playback SDK with the access token
- Provides playback controls, album art, seekbar, and queue
