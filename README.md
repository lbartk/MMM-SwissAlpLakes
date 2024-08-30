# MMM-SwissAlpLakes
This module fetches the temperature from the [AlpLakes API](https://www.alplakes.eawag.ch/api) every hour and displays it on your MagicMirror. It also changes the icon displayed based on the temperature.

The module is based on an idea from the [MMM-SwissLakeTemperature](https://github.com/roufri/MMM-SwissLakeTemperature)

## Demo
![image](https://github.com/user-attachments/assets/f5e8c21a-7092-4702-8b7d-59e4ca7a6f99)

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
1. basic configuration
```javascript
{
    module: "MMM-SwissAlpLakes",
    position: "top_right", // Example position
    showLastUpdated: false, // Set to false if you don't want to show the last updated time
    config: {
        lat: '47.309263',
        lng: '8.583303',
        lake: 'zurich',
        depth: '1'
    }
}
```
2. If you want to display information from a few lakes, you need to use an array
```javascript
{
	module: "MMM-SwissAlpLakes",
	position: "top_left", // Or any other position
	showLastUpdated: false, // Set to false if you don't want to show the last updated time
	config: {
		lakes: [
			{ lat: '47.309263', lng: '8.583303', lake: 'zurich', depth: '1' },
			{ lat: '47.363915', lng: '8.672333', lake: 'greifensee', depth: '1' }
		]
	}
}
```
