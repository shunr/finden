//Handle all image classification work
//Input base64 encoded images & target object tag and return a boolean
'use strict';
const watson = require('watson-developer-cloud');
const conf = require('../config.json');
const archiver = require('archiver');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

let mod = module.exports = {};

//take in single image and classify it

mod.classifyImage = (base64Data, tags) => {
    return new Promise((resolve, reject) => {
        base64ToTempFile(base64Data).then((imagePath) => {
            let visualRecognition = watson.visual_recognition({
                api_key: conf.classifier.WATSON_API_KEY,
                version: 'v3',
                version_date: '2016-05-20'
            });
            let params = {
                images_file: fs.createReadStream(imagePath[0]),
                parameters: {
                    threshold: conf.classifier.WATSON_THRESHOLD,
                    owners: ['IBM']
                }
            };
            new Promise((resolve, reject) => {
                visualRecognition.classify(params, function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        let matchedTags = getMatchedTags(res.images, tags);
                        resolve(matchedTags);

                    }
                });
            }).then((matchedTags) => {
                resolve(matchedTags);
            });
        });
    });
}

function base64ToTempFile(base64Data) {
    let c = 0;
    let paths = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < base64Data.length; i++) {
            //let matches = base64Data[i].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

            //let data = new Buffer(matches[2], 'base64');
            let data = new Buffer(base64Data[i], 'base64');
            let path = "./temp/" + uuidv4() + ".jpg";
            fs.writeFile(path, data, (err) => {
                console.log("Written file number " + c);
                if (err) {
                    console.log(err);
                }

                paths.push(path);
                c += 1
                if (c == base64Data.length) {
                    console.log(paths);
                    resolve(paths);
                }
            });
        }
    });
}

function zipImages(base64Data) {
    return new Promise((resolve, reject) => {
        base64ToTempFile(base64Data).then((imagePaths) => {
            let id = uuidv4()
            let zipPath = './temp/' + id + '.zip';
            var output = fs.createWriteStream(zipPath);
            var archive = archiver('zip', {
                zlib: {
                    level: 9
                }
            });

            output.on('close', function () {
                console.log('Archive ' + zipPath + ' successfully saved');
                resolve(zipPath);
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
                archive.append(fs.createReadStream(imagePaths[i]), {
                    name: uuidv4() + '.jpg'
                }); //replace with proper file extension
            }

            archive.finalize();
        });
    });
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
        if (tagSum[targetTags[i]] > conf.classifier.MATCH_THRESHOLD*classification.length) {
            matchedTags.push(targetTags[i]);
        }
    }
    return matchedTags;
}

return mod;