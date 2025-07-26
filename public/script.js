const socket = io();

// Init map
const map = L.map('map').setView([51.505, -0.09], 14);  // London center
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Store active users by ID
const users = {};

socket.on('crowdData', (data) => {
  const { id, lat, lng } = data;

  // If user already exists, update position
  if (users[id]) {
    users[id].setLatLng([lat, lng]);
  } else {
    // Else, add new marker
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`User ${id}`);
    users[id] = marker;
  }
});
