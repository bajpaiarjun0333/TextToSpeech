//init speech synthesis api
const synth=window.speechSynthesis;

//DOM Manipulation Elements Grabbing
const textform=document.querySelector('form');
const textInput=document.querySelector('#text-input');
const voiceSelect=document.querySelector('#voice-select');
const rate=document.querySelector('#rate');
const rateValue=document.querySelector('#rate-value');
const pitch=document.querySelector('#pitch');
const pitchValue=document.querySelector('#pitch-value');


//My voice array
let voices=[];

//filling our array with the available voices to use
const getVoices=function(){
  voices=synth.getVoices();
 // console.log(voices);
 //now since the voices are readily loaded then start with the filling of the select list with the options
voices.forEach(function(voice){
//for each of the voice received we are  creating one option each
const option=document.createElement('option');
// filling the option with voice and language
option.textContent=voice.name+'('+voice.lang+')';
option.setAttribute('data-name',voice.name);
option.setAttribute('data-lang',voice.lang);
voiceSelect.appendChild(option);
});
};

//getVoices();
if(synth.onvoiceschanged!==undefined){
  synth.onvoiceschanged=getVoices;
}


//speaking already functionality
const speak=function(){
if(synth.speaking){
  console.error('Speaking');
  return;
}
//Checking if the input field is not empty at all
if(textInput.value!==''){
  const speakTest=new SpeechSynthesisUtterance(textInput.value);
  //Speak Till The End
  speakTest.onend=function(){
    console.log("Reached End Of Speaking");
  };
  //Handling Error If Any
  speakTest.onerror=function(){
    console.log("Something went extremely Wrong");
  };
  //knowing the language to speak cleverly using the data attributes that we set before
  const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');
  console.log("selected voice is "+selectedVoice);
  //looking for the same voice in the array
  voices.forEach(function(voice){
    if(selectedVoice===voice.name){
      speakTest.voice=voice;
    }
  });
  //setting the pitch and the rate for the speaktest object
  speakTest.rate=rate.value;
  speakTest.pitch=pitch.value;
  //making the object to speak
  synth.speak(speakTest);
  
}

};

//adding the event listeners
textform.addEventListener('submit',function(e){
e.preventDefault();
speak();
textInput.blur();
});

//attaching the event to the rate badge
rate.addEventListener('change',function(e){
rateValue.textContent=rate.value;
});

//attaching the event listener to the pitch badge 
pitch.addEventListener('change',function(e){
pitchValue.textContent=pitch.value;
});

//attching a change listener to the select langusge
voiceSelect.addEventListener('change',function(e){
speak();
});


