Module.register("MMM-SwissAlpLakes", {
    defaults: {
        lakes: [
            { lat: '47.309263', lng: '8.583303', lake: 'zurich', depth: '1' },
            { lat: '46.94809', lng: '7.44744', lake: 'geneva', depth: '1' }
        ],
        updateInterval: 90 * 60 * 1000, // 90 minutes
        showLastUpdated: true // Default: show the last updated time
    },

    start: function() {
        this.lakeData = {};
        this.lastUpdate = null;
        this.updateTemperature();
        this.scheduleUpdate();
    },

    getDom: function() {
        var wrapper = document.createElement("div");

        if (Object.keys(this.lakeData).length > 0) {
            this.config.lakes.forEach(lakeConfig => {
                var lakeName = lakeConfig.lake;
                var lakeInfo = this.lakeData[lakeName];

                if (lakeInfo && lakeInfo.temperature !== null) {
                    var lakeWrapper = document.createElement("div");
                    lakeWrapper.className = "lake-wrapper";

                    var symbol = document.createElement("i");
                    symbol.className = "fa " + this.getSymbolClassForTemperature(lakeInfo.temperature);
                    lakeWrapper.appendChild(symbol);

                    var tempDiv = document.createElement("div");
                    tempDiv.className = "temp-details";
                    tempDiv.innerHTML = `${lakeInfo.temperature.toFixed(1)} &deg;C in lake ${lakeName.charAt(0).toUpperCase() + lakeName.slice(1)}`;
                    lakeWrapper.appendChild(tempDiv);

                    wrapper.appendChild(lakeWrapper);
                }
            });

            // Add last update time at the end if configured to show
            if (this.config.showLastUpdated) {
                var updateWrapper = document.createElement("div");
                updateWrapper.className = "last-update";
                updateWrapper.innerHTML = `Last updated: ${this.formatTimeForDisplay(this.lastUpdate)}`;
                wrapper.appendChild(updateWrapper);
            }

        } else {
            wrapper.innerHTML = "Loading...";
        }
        return wrapper;
    },

    getSymbolClassForTemperature: function(temperature) {
        if (temperature >= 22) {
            return "fa-thermometer-full temp-hot";
        } else if (temperature >= 18) {
            return "fa-thermometer-three-quarters temp-warm";
        } else if (temperature >= 10) {
            return "fa-thermometer-half temp-average";
        } else if (temperature >= 5) {
            return "fa-thermometer-quarter temp-cold";
        } else {
            return "fa-thermometer-empty temp-freezing";
        }
    },

    scheduleUpdate: function() {
        var self = this;
        setInterval(function() {
            self.updateTemperature();
        }, this.config.updateInterval);
    },

    updateTemperature: function() {
        var self = this;
        var now = new Date();
        var endTime = this.formatTime(now);
        var startTime = this.formatTime(new Date(now.getTime() - 60 * 60 * 1000)); // minus 1 hour

        this.config.lakes.forEach(function(lakeConfig) {
            var url = `https://alplakes-api.eawag.ch/simulations/point/delft3d-flow/${lakeConfig.lake}/${startTime}/${endTime}/${lakeConfig.depth}/${lakeConfig.lat}/${lakeConfig.lng}`;

            self.sendSocketNotification("GET_TEMPERATURE", { url: url, lake: lakeConfig.lake });
        });

        this.lastUpdate = now;
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "TEMPERATURE_RESULT") {
            this.lakeData[payload.lake] = { temperature: payload.temperature };
            this.updateDom();
        }
    },

    formatTime: function(date) {
        return date.getUTCFullYear().toString() +
            ("0" + (date.getUTCMonth() + 1)).slice(-2) +
            ("0" + date.getUTCDate()).slice(-2) +
            ("0" + date.getUTCHours()).slice(-2) +
            ("0" + date.getUTCMinutes()).slice(-2);
    },

    formatTimeForDisplay: function(date) {
        if (!date) return "Never";

        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var hours = ("0" + date.getHours()).slice(-2);
        var minutes = ("0" + date.getMinutes()).slice(-2);
        var seconds = ("0" + date.getSeconds()).slice(-2);

        return `${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    getStyles: function() {
        return ["MMM-SwissAlpLakes.css", "font-awesome.css"];
    }
});
