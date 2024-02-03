var SpeechRecognition = window.webkitSpeechRecognition;
var recognition1 = new SpeechRecognition();
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var microphone;

function startListening() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            microphone = audioContext.createMediaStreamSource(stream);
            var analyser = audioContext.createAnalyser();
            microphone.connect(analyser);

            // Set the parameters for the analyser
            analyser.fftSize = 256;
            var bufferLength = analyser.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);

            function checkLoudness() {
                analyser.getByteFrequencyData(dataArray);
                var average = getAverageVolume(dataArray);

                // Check if the average volume is above 20 dB
                if (average > 40) {
                    recognition1.start();
                }

                // Check the loudness continuously
                requestAnimationFrame(checkLoudness);
            }

            checkLoudness();
        })
        .catch(function(err) {
            console.error("Error accessing the microphone: " + err);
        });
}

function getAverageVolume(array) {
    var values = 0;
    var average;

    for (var i = 0; i < array.length; i++) {
        values += array[i];
    }

    average = values / array.length;
    return average;
}
        recognition1.onresult=function(event){
        console.log(event);
        var Content =event.results[0][0].transcript;
        console.log(Content);
        document.getElementById("textbox").innerHTML=Content;
        console.log(Content);
        if(Content=="take my selfie")
        {
        console.log("taking selfie---");
        speak();
        }
        if(Content.includes('play')){
        var play=Content.replace("play","").trim();
        var allAudio = document.querySelectorAll('audio'); // Assuming all audio elements are on the page
  allAudio.forEach(function(audio) {
    audio.pause();
  });
        if(play=='legends never die'){
          var a=document.getElementById("myAudiomemolng");
        a.play();
       
            }
        if(play=='believer'){
        var b=document.getElementById("myAudiomemobeliever");
        b.play();
        }
        if(play=='bones'){
            var c=document.getElementById("myAudiomemobones");
        c.play();
        }
        if(play=='enemy'){
            var d=document.getElementById("myAudiomemoenemy");
        d.play();
        }
        if(play=='Fly Away'){
            var e=document.getElementById("myAudiomemofly");
        e.play();
        }
      if(play=='Other Side'){
        var f=document.getElementById("myAudiomemoother");
         f.play();
        }
        if(play=='Spectre'){
            var g=document.getElementById("myAudiomemospec");
        g.play();
        }
        if(play=='faded'){
            var h=document.getElementById("myAudiomemofade");
        h.play();
        } 
        if(play=='girls like you'){
            var i=document.getElementById("myAudiomemogirl");
        i.play();
        }        
        }
        
        if(Content=="chat")
        {
            window.location="https://mahdihat791.github.io/v2/kwitter/index.html";
        }
        
        if (Content.includes('question'))
        {
        
         ask=Content.replace("question", "");
        var link="https://www.google.com/search?q="+ask;
        window.location=link;
        }
        if (Content.includes('how to'))
        {
        
         ask=Content.replace("how to", "");
        var link2="https://www.wikihow.com/wikiHowTo?search="+ask;
        window.location=link2;
        }
        
  
       
        }
        
        function speak()
        {
        var synth=window.speechSynthesis;
        speak_data="taking your selfie in 5 seconds";
        var utterThis=new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
        Webcam.attach(camera);
        setTimeout(function()
        {
        take_snapshot();
        save()  ;
        },5000);
        }
        camera=document.getElementById("camera");
        Webcam.set({
        width:360,
        height:360,
        image_format:'jpeg',
        jpeg_quality:100
        });
        function take_snapshot()
        {
        Webcam.snap(function(data_uri)
        {
        document.getElementById("result").innerHTML="<img id='selfie_image' src='"+data_uri+"'>";
        });
        }
        function save()
        {
        link=document.getElementById("link");
        image=document.getElementById("selfie_image").src;
        link.href=image;
        link.click();
        }
       

