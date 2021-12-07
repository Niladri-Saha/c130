song="";
scoreLeftWrist=0;
scoreRightWrist=0;
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture();
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#ffcc00");
    stroke("0099ff")
if(scoreRightWrist>0.2){
    circle(rightWristX,rightWristY,20);
    if (rightWristY>0 && rightWristX<=100)
     {
       document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    } else if(rightWristY>100 && rightWristX<=200)
    {
        document.getElementById("speed").innerHTML="Speed = 1x";
        song.rate(1);  
    }else if(rightWristY>200 && rightWristX<=300)
    {
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);  
    }else if(rightWristY>300 && rightWristX<=400)
    {
        document.getElementById("speed").innerHTML="Speed = 2x";
        song.rate(2);  
    }else if(rightWristY>400 && rightWristX<=500)
    {
        document.getElementById("speed").innerHTML="Speed = 2.5x";
        song.rate(2.5);  
    }
}
if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimal=floor(InNumberleftWristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);
}
}
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.rate(1);
}
function modelLoaded(){
    console.log("model is loaded");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);
        console.log("scoreRightWrist = "+scoreRightWrist);
        leftWristX=results[0].pose.leftWrist.x;
        rightWristX=results[0].pose.rightWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftWristX= "+leftWristX);
        console.log("rightWristX= "+rightWristX);
        console.log("leftWristY= "+leftWristY);
        console.log("rightWristY= "+rightWristY);
    }
}