window.onSpotifyWebPlaybackSDKReady = () => {
  const token = localStorage.getItem("spotifyAccessToken");

  if (!token) {
    alert("Not authenticated. Redirecting to login...");
    window.location.href = "login.html"; // or wherever your login is
    return;
  }

  const player = new Spotify.Player({
    name: "Spotify API Player",
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 1.0,
  });

  // Error handlers
  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });
  player.addListener("playback_error", ({ message }) => {
    console.error(message);
  });
  // Error handlers

  // Device ready
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
  });

  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });
  // Device ready

  // Update album art when state changes
  player.addListener("player_state_changed", (state) => {
    if (state) updateAlbumArt(state);
  });
  // Update album art when state changes

  // Connect the player
  player.connect();

  // Play
  document.getElementById("togglePlay").onclick = () => {
    player.togglePlay().then(() => {
      player.getCurrentState().then((state) => {
        if (state) updateAlbumArt(state);
      });
    });
  };
  // Play

  // Previous
  document.getElementById("previous").onclick = () => {
    player.previousTrack().then(() => {
      player.getCurrentState().then((state) => {
        if (state) updateAlbumArt(state);
      });
    });
  };
  // Previous

  // Next
  document.getElementById("next").onclick = () => {
    player.nextTrack().then(() => {
      player.getCurrentState().then((state) => {
        if (state) updateAlbumArt(state);
      });
    });
  };
  // Next

  // Function to update album art
  function updateAlbumArt(state) {
    const currentTrack = state.track_window.current_track;
    const albumImageUrl = currentTrack.album.images[0].url;
    document.getElementById("albumArt").src = albumImageUrl;
  }
  // Function to update album art

  const seekBar = document.getElementById("seekBar");

  // Seekbar variables
  let currentTrackDuration = 0;
  const currentTimeDisplay = document.getElementById("currentTime");
  const durationDisplay = document.getElementById("duration");
  // Seekbar variables

  // Update time every second
  setInterval(() => {
    player.getCurrentState().then((state) => {
      if (!state) return;

      const position = state.position;
      const duration = state.duration;
      currentTrackDuration = duration;

      seekBar.max = duration;
      seekBar.value = position;

      currentTimeDisplay.textContent = formatTime(position);
      durationDisplay.textContent = formatTime(duration);

      updateSeekFill();
    });
  }, 1000);
  // Update time every second

  // Seek to new time when user changes the range
  seekBar.addEventListener("input", () => {
    player.seek(Number(seekBar.value));
  });
  // Seek to new time when user changes the range

  // Format milliseconds into mm
  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  // Format milliseconds into mm

  // Change color of seekbar
  function updateSeekFill() {
    const value = (seekBar.value / seekBar.max) * 100;
    seekBar.style.background = `linear-gradient(to right,rgb(142, 248, 181), #22c55e  ${value}%, #4b5563 ${value}%)`;
  }
  seekBar.addEventListener("input", updateSeekFill);
  window.addEventListener("DOMContentLoaded", updateSeekFill);
  // Change color of seekbar

  // Song name
  player.addListener("player_state_changed", (state) => {
    if (!state) return;
    const track = state.track_window.current_track;
    document.getElementById("nowplayingname").textContent = track.name;
    // Song name

    // Que list
    const queueList = document.getElementById("quelist");
    const queue = state.track_window?.next_tracks;

    queueList.innerHTML = `<h2 class="text-green-400 text-2xl mb-4">Up Next</h2>`;

    queue.forEach((track) => {
      const trackDiv = document.createElement("div");
      trackDiv.className = "flex-items-center mb-4";
      trackDiv.innerHTML = `<img src="${
        track.album.images[2]?.url || track.album.images[0]?.url
      }" alt="Cover" class="w-12 h-12 rounded mr-4 border border-gray-700" />
      <span class="text-white text-lg">${track.name}</span>`;
      queueList.appendChild(trackDiv);
      // Que list
    });
  });
};
