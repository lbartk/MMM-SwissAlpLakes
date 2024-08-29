# MMM-SwissAlpLakes
This module will fetch the temperature from the specified API every hour and display it on your MagicMirror. It also changes the displayed icon based on the temperature.

The module is based on the [<repo_url> MMM-SwissLakeTemperature](https://github.com/roufri/MMM-SwissLakeTemperature)

## Installation

1. Navigate to your MagicMirror `modules` directory:
    ```
    cd ~/MagicMirror/modules
    ```
2. Clone this repository:
    ```
    git clone https://github.com/lbartk/MMM-SwissAlpLakes
    ```
3. Add the module to your `config.js` file.

## Configuration

```javascript
{
    module: "MMM-SwissAlpLakes",
    position: "top_right", // Example position
    config: {
        lat: '47.309263',
        lng: '8.583303',
        lake: 'zurich',
        depth: '1'
    }
}
