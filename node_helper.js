var NodeHelper = require("node_helper");
var request = require("request");

module.exports = NodeHelper.create({
    socketNotificationReceived: function(notification, payload) {
        var self = this;
        if (notification === "GET_TEMPERATURE") {
            var options = {
                url: payload.url,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            };
            request(options, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body);
                    var temperature = null;
                    if (result.temperature && result.temperature.data.length > 0) {
                        temperature = result.temperature.data[result.temperature.data.length - 1];
                    }
                    self.sendSocketNotification("TEMPERATURE_RESULT", { temperature: temperature, lake: payload.lake });
                } else {
                    console.error("Error fetching temperature: " + error);
                }
            });
        }
    }
});
