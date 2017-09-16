//Handle all image classification work
//Input base64 encoded images & target object tag and return a boolean
'use strict';
const watson = require('watson-developer-cloud');
const conf = require('../config.json');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

let mod = module.exports = {};

//take in single image and classify it


mod.classifyImage = (base64Data, tags) => {
    let imageFiles = base64ToTempFile(base64Data);
    let zipPath = zipImages(imageFiles);

    let visualRecognition = watson.visual_recognition({
        api_key: conf.classifier.WATSON_API_KEY,
        version: 'v3',
        version_date: '2016-05-20'
    });
    let params = {
        images_file: fs.createReadStream('./leeks.zip'),
        parameters: {
            threshold: conf.classifier.WATSON_THRESHOLD,
            owners: ['IBM']
        }
    };
    visualRecognition.classify(params, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            let matchedTags = getMatchedTags(res.images, tags);
            return matchedTags;
        }
    });

}

function base64ToTempFile(base64Data) {
    let paths = [];
    for (let i = 0; i < base64Data.length; i++) {
        let data = base64Data.replace(/^data:image\/png;base64,/, "");
        let path = '../temp/' + uuidv4();

        require("fs").writeFile(path, data, 'base64', function (err) {
            console.log(err);
        });
        path.append(path);
    }
    return paths;
}

function zipImages(imagePaths) {
    let id = uuidv4()
    let zipPath = '../temp' + id;
    var output = fs.createWriteStream(zipPath);
    var archive = archiver('zip', {
        zlib: { level: 9 }
    });

    output.on('close', function () {
        console.log('Archive ' + zipPath + 'successfully saved');
        return zipPath;
    });

    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            console.log(err);
        } else {
            throw err;
        }
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);

    for (let i = 0; i < imagePaths.length; i++) {
        archive.append(fs.createReadStream(imagePaths[i]), { name: uuidv4() + '.jpg' }); //replace with proper file extension
    }

    archive.finalize();
}

function getMatchedTags(classification, targetTags) {
    let tagSum = {}
    
    for (let i = 0; i < classification.length; i++) {
        let classes = classification[i].classifiers[0].classes;
        for (let j = 0; j < classes.length; j++) {
            if (tagSum[classes[j].class]) {
                tagSum[classes[j].class] += classes[j].score;
            } else {
                tagSum[classes[j].class] = classes[j].score;
            }
        }
    }

    let matchedTags = [];
    for (let i = 0; i < targetTags.length; i++) {
        if (tagSum[targetTags[i]]>conf.classifier.MATCH_THRESHOLD){
            matchedTags.push(targetTags[i]);
        }
    }
    return matchedTags;
}

return mod;