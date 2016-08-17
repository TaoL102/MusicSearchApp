// $('#video').YTPlayer({
//     fitToBackground: true,
//     videoId: 'rovF7mbQ2fs',
//     pauseOnScroll: false,
//     playerVars: {
//         modestbranding: 0,
//         autoplay: 1,
//         controls: 0,
//         showinfo: 0,
//         wmode: 'transparent',
//         branding: 0,
//         rel: 0,
//         autohide: 0,
//         origin: window.location.origin
//     } });
// -------------------new
// Variables
$("#search-btn").click(function () {
    var txt = $("#search-box").val();
    sendSearchLyricsRequest(txt);
});
$("#share-btn").click(function () {
    FB.ui({
        method: 'share',
        href: 'http://musicsearchapp.azurewebsites.net/',
    }, function (response) { });
});
// sendSearchLyricsRequest
function sendSearchLyricsRequest(searchTxt) {
    $.ajax({
        type: "GET",
        data: {
            apikey: "7412583d7195586a08b845bb5a933c1b",
            q: searchTxt,
            page_size: 5,
            s_track_rating: "desc",
            format: "jsonp",
            callback: "jsonp_callback"
        },
        url: "http://api.musixmatch.com/ws/1.1/track.search",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function (data) {
            // Get info from api
            var returnData = data.message.body.track_list;
            var track_name;
            var album_coverart_350x350;
            var track_share_url;
            var artist_name;
            var album_name;
            returnData.forEach(function (element) {
                track_name = element.track.track_name;
                album_name = element.track.album_name;
                album_coverart_350x350 = element.track.album_coverart_350x350;
                track_share_url = element.track.track_share_url;
                artist_name = element.track.artist_name;
                console.log(element);
                var p_track_name = document.createElement("p");
                p_track_name.textContent = track_name;
                p_track_name.id = track_name;
                var p_album_name = document.createElement("p");
                p_album_name.textContent = album_name;
                p_album_name.id = album_name;
                var p_track_share_url = document.createElement("p");
                p_track_share_url.textContent = track_share_url;
                p_track_share_url.id = track_share_url;
                var p_artist_name = document.createElement("p");
                p_artist_name.textContent = artist_name;
                p_artist_name.id = artist_name;
                var img_album_coverart_350x350 = document.createElement("img");
                img_album_coverart_350x350.setAttribute("src", album_coverart_350x350);
                $("#search-result-container").append(p_track_name);
                $("#search-result-container").append(p_album_name);
                $("#search-result-container").append(p_track_share_url);
                $("#search-result-container").append(p_artist_name);
                $("#search-result-container").append(img_album_coverart_350x350);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
