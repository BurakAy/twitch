$(document).ready(function() {

    var twitchChannels = ["ESL_SC2", "OgamingSC2", "bobross", "freecodecamp", "jvtv", "habathcx", "RobotCaleb", "noobs2ninjas", "sssmcgrath", "comster404"];

    for (var i = 0; i < twitchChannels.length; i++) { //iterate through array of channels

        (function(i) {
            var aChannel = twitchChannels[i];
            var url = "https://wind-bow.gomix.me/twitch-api/streams/" + aChannel + "?callback=?";

            $.getJSON(url, function(data) { //get channel stream status
                var streamStatus;
                var channelLogo;
                var channelDisplayName;
                var channelURL;

                if (data.stream != null) { //if channel is streaming
                    channelLogo = data.stream.channel.logo;
                    channelDisplayName = data.stream.channel.display_name;
                    channelURL = data.stream.channel.url;
                    streamStatus = data.stream.channel.status;

                    $(".twitch").append("<div class='channel isonline'><img class='logo' src='" + channelLogo + "'><a href='" + channelURL + "' target='_blank'><h4 class='channelname'>" + channelDisplayName + "</h4></a><p class='streamingstatus'>" + streamStatus + "</p></div>");
                }

                if (data.error) {
                    streamStatus = data.error + ": " + data.status;
                    channelDisplayName = aChannel; //set channel name so it doesn't show as being undefined
                    channelLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/No_sign.svg/2000px-No_sign.svg.png";
                    channelURL = "";

                    $(".twitch").append("<div class='channel isunavailable'><img class='logo' src='" + channelLogo + "'><a href='" + channelURL + "' target='_blank'><h4 class='channelname'>" + channelDisplayName + "</h4></a><p class='streamingstatus'>" + streamStatus + "</p></div>");
                }

                if (data.stream === null) { //check if channel is not streaming

                    $.getJSON(data._links.channel + "?client_id=3ayqtffruo2goxf0cvyp75wjm28g4pq&callback=?", function(data2) {

                        if (data2.error) { //if channel doesn't exist
                            streamStatus = data2.message;
                            channelDisplayName = aChannel; //set channel name so it doesn't show as being undefined
                            channelLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/No_sign.svg/2000px-No_sign.svg.png";

                            $(".twitch").append("<div class='channel isunavailable'><img class='logo' src='" + channelLogo + "'><a href='" + channelURL + "' target='_blank'><h4 class='channelname'>" + channelDisplayName + "</h4></a><p class='streamingstatus'>" + streamStatus + "</p></div>");
                        } else {
                            streamStatus = "Offline";
                            channelLogo = data2.logo;
                            channelDisplayName = data2.display_name;
                            channelURL = data2.url;

                            $(".twitch").append("<div class='channel isoffline'><img class='logo' src='" + channelLogo + "'><a href='" + channelURL + "' target='_blank'><h4 class='channelname'>" + channelDisplayName + "</h4></a><p class='streamingstatus'>" + streamStatus + "</p></div>");
                        } //end if

                    }); //end .getJSON

                } //end if

            }); //end .getJSON

        })(i); //end funtion scope

    } //end for

}); //end document .ready