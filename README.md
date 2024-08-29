# MMM-SwissAlpLakes
This module will fetch the temperature from the specified API every hour and display it on your MagicMirror. It also changes the displayed icon based on the temperature.

The module is based on idea form the [MMM-SwissLakeTemperature](https://github.com/roufri/MMM-SwissLakeTemperature)

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
1. For one lake
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
```
2. If you want to display information from a few lakes, you need to use array
```
			module: "MMM-SwissAlpLakes",
			position: "top_left", // Or any other position
			config: {
				lakes: [
					{ lat: '47.309263', lng: '8.583303', lake: 'zurich', depth: '1' },
					{ lat: '47.363915', lng: '8.672333', lake: 'greifensee', depth: '1' }
				]
			}
		},
```
