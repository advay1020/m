let song1;
let song2;
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;

let poseNet;



function modelLoaded() {
  console.log('PoseNet model loaded!');
  poseNet.on('pose', gotPoses);
}


function preload() {
  song1 = loadSound(music.mp3);
  song2 = loadSound(music2.mp3);
}

function setup() {
  poseNet = ml5.poseNet(video, modelLoaded);
  createCanvas(windowWidth, windowHeight);
  let constraints = {
    video: {
      mandatory: {
        minWidth: width,
        minHeight: height,
      },
      optional: [{ maxFrameRate: 30 }],
    },
    audio: false,
  };
  video = createCapture(constraints, function () {
    video.hide();
  });
}

function draw() {
  image(video, 0, 0, width, height);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    let pose = poses[0].pose;
    leftWristX = pose.leftWrist.x;
    leftWristY = pose.leftWrist.y;
    rightWristX = pose.rightWrist.x;
    rightWristY = pose.rightWrist.y;
  }
}
