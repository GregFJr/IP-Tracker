let ip = document.getElementById('ip');
let locale = document.getElementById('location');
let timezone = document.getElementById('timezone');
let utc = document.getElementById('utc');
let isp = document.getElementById('isp');
let ipsearch = document.getElementById('ipsearch');


async function getIpInfo(ipAddress) {
    try {
        const response = await fetch(`https://ipinfo.io/${ipAddress}/json?token=86e700743899e3`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}

function updateIpInfo(data) {
    ip.innerText = data.ip;
    locale.innerText = data.loc;
    const timezoneOffset = new Date().getTimezoneOffset();
    const utcOffset = -timezoneOffset / 60;
    utc.innerText = utcOffset >= 0 ? `+${utcOffset}` : `${utcOffset}`;
    isp.innerText = data.org;
}

function updateMap(latitude, longitude) {
    map.setCenter({lat: latitude, lng: longitude});
    marker.setPosition({lat: latitude, lng: longitude});
}

function ipSearch() {
    const ipLookUp = ipsearch.value.trim();
    getIpInfo(ipLookUp)
        .then(data => {
            console.log(data);
            updateIpInfo(data);
            const [lat, lon] = data.loc.split(',').map(Number);
            updateMap(lat, lon);
        })
        .catch(error => console.error(error));
    console.log('Searching for IP Address:', ipLookUp);
}

ipsearch.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        ipSearch();
    }
});
