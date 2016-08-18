$(function () {
    // define variables for html elements
    var element_search_btn = $("#search-btn");
    var element_search_box = $("#search-box");
    var element_share_btn = $("#share-btn");
    var element_search_result_container = $("#search-result-container");
    var element_search_result_header = $("#header-result");
    var element_search_result_div = $("#div-search-result");
    // Bootstrap script: for scrolling 
    $(window).scroll(function () {
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });
    // Bootstrap script:Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#main-div']").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {
                window.location.hash = hash;
            });
        }
    });
    // search button click event
    element_search_btn.click(function () {
        var txt = element_search_box.val();
        sendSearchLyricsRequest(txt);
    });
    // share button click event
    element_share_btn.click(function () {
        FB.ui({
            method: 'share',
            href: 'http://musicsearchapp.azurewebsites.net/'
        }, function (response) { });
    });
    // Method: Jquery Ajax: sendSearchLyricsRequest
    function sendSearchLyricsRequest(searchTxt) {
        $.ajax({
            type: "GET",
            data: {
                apikey: "7412583d7195586a08b845bb5a933c1b",
                q: searchTxt,
                page_size: 10,
                s_track_rating: "desc",
                format: "jsonp",
                callback: "jsonp_callback"
            },
            url: "http://api.musixmatch.com/ws/1.1/track.search",
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function (data) {
                element_search_result_container.empty();
                element_search_result_div.css("display", "block");
                if (data != null) {
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
                        // Check if 350*350 pic exists, if not ,use 100*100 pic
                        if (album_coverart_350x350 == "") {
                            album_coverart_350x350 = element.track.album_coverart_100x100;
                        }
                        track_share_url = element.track.track_share_url;
                        artist_name = element.track.artist_name;
                        console.log(element);
                        var a_img = document.createElement("a");
                        var div_Container = document.createElement("div");
                        var div_Thumbnail = document.createElement("div");
                        var img_album_coverart_350x350 = document.createElement("img");
                        var p_track_name = document.createElement("p");
                        var strong_track_name = document.createElement("strong");
                        var p_artist_name = document.createElement("p");
                        img_album_coverart_350x350.setAttribute("src", album_coverart_350x350);
                        img_album_coverart_350x350.setAttribute("alt", track_name);
                        a_img.href = track_share_url;
                        img_album_coverart_350x350.style.width = "100%";
                        img_album_coverart_350x350.style.height = "100%";
                        a_img.appendChild(img_album_coverart_350x350);
                        strong_track_name.textContent = track_name;
                        p_track_name.appendChild(strong_track_name);
                        p_artist_name.textContent = artist_name;
                        div_Thumbnail.className = "thumbnail";
                        div_Thumbnail.appendChild(a_img);
                        div_Thumbnail.appendChild(strong_track_name);
                        div_Thumbnail.appendChild(p_artist_name);
                        div_Container.className = "col-sm-4";
                        // div_Container.style.width="300px";
                        // div_Container.style.height="300px";
                        div_Container.appendChild(div_Thumbnail);
                        element_search_result_container.append(div_Container);
                    });
                    element_search_result_header.text("We have found those songs for you:");
                }
                else {
                    element_search_result_div.css("display", "block");
                    element_search_result_header.text("Sorry! Nothing found.");
                }
                $('html, body').animate({
                    scrollTop: element_search_result_div.offset().top
                }, 900);
                window.location.href = "#div-search-result";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                element_search_result_container.empty();
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                element_search_result_div.css("display", "block");
                element_search_result_header.text("Connection to MusixMatch API failed.");
            }
        });
    }
    ;
});
