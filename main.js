Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
})

camera = document.getElementById('camera')
Webcam.attach(camera)

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById('result').innerHTML = '<img id="captured_image" src="' + data_uri + '"/>'
    })

}
console.log("ml5.version", ml5.verion)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/KCdgwUumB/model.json", modelLoaded)

function modelLoaded() {
    console.log("model Loaded!")
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;

        if (result[0].label == "wave") {
            document.getElementById("update_emotion").innerHTML = "&#128075;";
        }

        if (result[0].label == "clap") {
            document.getElementById("update_emotion").innerHTML = "&#128079;";
        }
        if (result[0].label=="thumbs up"){
            document.getElementById("update_emotion").innerHTML = "&#128077;";
        }

        if (result[1].label == "wave") {
            document.getElementById("update_emotion2").innerHTML = "&#128075;";
        }

        if (result[1].label == "clap") {
            document.getElementById("update_emotion2").innerHTML = "&#128079;";
        }
        if (result[1].label=="thumbs up"){
            document.getElementById("update_emotion2").innerHTML = "&#128077;";
        }
    }
}