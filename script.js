let ip = document.getElementById("ip");
let locale = document.getElementById("location");
let timezone = document.getElementById("timezone");
let utc = document.getElementById("utc");
let isp = document.getElementById("isp");
let ipsearch = document.getElementById("ipsearch");

let map;
let marker;

async function getIpInfo(ipAddress) {
  try {
    const response = await fetch(
      `https://ipinfo.io/${ipAddress}/json?token=86e700743899e3`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}

function updateIpInfo(data) {
  ip.innerText = data.ip;
  locale.innerText = `${data.city}, ${data.region}, ${data.postal}`;
  const timezoneOffset = new Date().getTimezoneOffset();
  const utcOffset = -timezoneOffset / 60;
  utc.innerText = utcOffset >= 0 ? `+${utcOffset}` : `${utcOffset}`;
  isp.innerText = data.org;
}

function updateMap(latitude, longitude) {
  map.setCenter({ lat: latitude, lng: longitude });
  marker.setPosition({ lat: latitude, lng: longitude });
}

function ipSearch() {
  const ipLookUp = ipsearch.value.trim();
  getIpInfo(ipLookUp)
    .then((data) => {
      if (ipLookUp) {
        console.log(data);
        updateIpInfo(data);
        const [lat, lon] = data.loc.split(",").map(Number);
        updateMap(lat, lon);
      } else {
        alert("Please enter an IP Address");
      }
    })
    .catch((error) => console.error(error));
  console.log("Searching for IP Address:", ipLookUp);
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 8,
  });

  marker = new google.maps.Marker({
    position: { lat: 40.7128, lng: -74.006 },
    map: map,
    title: "IP Location",
  });
}

ipsearch.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    ipSearch();
  }
});

initMap();
