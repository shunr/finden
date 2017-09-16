//Handle all image classification work
//Input base64 encoded images & target object tag and return a boolean
'use strict';
const req = require('request');
const conf = require('../config.json');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

let mod = module.exports = {};

//take in single image and classify it
function classifyImage(image) {

    req.post(conf.classifier.CLASSIFY_API_URL+'?api_key='+conf.classifier.WATSON_API_KEY).form({
        'images_file': image,
        'parameters': {
            'threshold': conf.classifier.THRESHOLD,
            'owners': ['IBM']
        }
    });
}


function base64ToTempFile(base64Data) {
    let data = base64Data.replace(/^data:image\/png;base64,/, "");
    let path = '../temp/' + uuidv4();

    require("fs").writeFile(path, data, 'base64', function(err) {
      console.log(err);
    });
    return path;
}

function zipImages(imagePaths) {

}
