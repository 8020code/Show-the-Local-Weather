$(document).ready(function () {
  console.log("document ready");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      $.get("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, function (data) {
        $("#location").html(data.sys.country + ", " + data.name);
        var scale;
        var f = "°F";
        var c = "°C";
        var t = data.main.temp;
        var tc, tf;

        if (data.sys.country === "US") {
          scale = f;
          tc = Math.round((t - 32) * 5 / 9, 1);
          tf = t;
        } else {
          scale = c;
          tf = Math.round(t * 9 / 5 + 32, 1);
          tc = t;
        }
        $("#temperature").html(t);
        $("#scale").html(scale);
        $(".b1").attr('title', 'Click to switch between C & F');
        $(".b1").each(function () {
          $(this).on("click", function () {
            if (scale === f) {
              $("#temperature").html(tc);
              $("#scale").html(c);
              scale = c;
            } else if (scale === c) {
              $("#temperature").html(tf);
              $("#scale").html(f);
              scale = f;
            } else {
              window.alert('something went wrong');
            }
          });
        });
        $("#pic").attr("src", data.weather[0].icon);
        $("#pic").attr("alt", data.weather[0].main);
        $("#pic").attr("title", data.weather[0].main);
      });
    });
  }
});