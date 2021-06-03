Webcam.set({
    height: 300,
    width: 350,
    image_format: 'jpeg',
    jpeg_quality: 180
});

camera = document.getElementById("camera");

Webcam.attach('camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/29uQc_ZRt/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }

    else {
        console.log(results);
        document.getElementById("resultobject").innerHTML = results[0].label;
        var per = results[0].confidence.toFixed(3) * 100;
        document.getElementById("resultaccuracy").innerHTML = per + "%";
    }
}


