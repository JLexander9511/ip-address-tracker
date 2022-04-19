let d = document

const $input = d.getElementById("input"),
      $ipData = d.getElementById("ipInfo"),
      $locData = d.getElementById("locInfo"),
      $tmzData = d.getElementById("tzInfo"),
      $ispData = d.getElementById("ispInfo")

//var map = L.map('map').setView([51.505, -0.09], 13);
var layer = new L.StamenTileLayer("terrain");
/*var map = new L.Map("map", {
    center: new L.LatLng(37.7, -122.4),
    zoom: 12
});
map.addLayer(layer);
var marker = L.marker([37.7, -122.4]).addTo(map);*/

async function putIpData(ip){
    let res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_nLFqfN41g5hAHYy9UElAf8RjfK3Pa&ipAddress=${ip}`)
    res = await res.json()
    $ipData.textContent = res.ip
    $locData.textContent = `${res.location.city}, ${res.location.region}`
    $tmzData.textContent = `UTC ${res.location.timezone}`
    $ispData.textContent = res.isp
    var map = new L.Map("map", {
        center: new L.LatLng(res.location.lat, res.location.lng),
        zoom: 12
    });
    map.addLayer(layer);
    var marker = L.marker([res.location.lat, res.location.lng]).addTo(map);
}

d.addEventListener("click", e => {
    if(e.target.matches(".button *")){
        let ipSearch = $input.value
        putIpData(ipSearch)
        
    }
})