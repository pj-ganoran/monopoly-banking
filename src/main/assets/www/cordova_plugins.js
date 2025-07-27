cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "community-cordova-plugin-nfc.NFC",
      "file": "plugins/community-cordova-plugin-nfc/www/phonegap-nfc.js",
      "pluginId": "community-cordova-plugin-nfc",
      "runs": true
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    }
  ];
  module.exports.metadata = {
    "community-cordova-plugin-nfc": "1.4.0",
    "cordova-plugin-splashscreen": "6.0.1"
  };
});