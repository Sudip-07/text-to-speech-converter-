// in it speech API 
const synth = window.SpeechSynthesis; 

// DOM element 
const textForm = document.querySelector('form') ;
const textInput = document.querySelector('#text-input') ;
const voiceSelect =  document.querySelector('#voice-select') ;
const rate =  document.querySelector('#rate') ;
const rateValue =  document.querySelector('#rate-value') ;
const pitch =  document.querySelector('pitch') ;
const  pitchValue= document.querySelector('pitch-value') ;

// in it voices array 
let voices = []  ;

const getVoices = () => {
    voices = synth.getVoices() ; 

    //loop through voices and creat a select list for each one  
    voices.forEach(voice => {
        //create option element 
        const option = document.createElement('option') ;
        // Fill option with voice and language 
        option.textContent = voice.name + '(' + voice.lang + ')' ;

        // set needed option attribute 
        option.setAttribute('data-lang', voice.lang) ; 
        option.setAttribute('data-name', voice.name) ; 
        voiceSelect.appendChild(option) ;

    }) ;
} ;
getVoices();
if(synth.onvoiceschanged !== undefined) {
   synth.onvoiceschanged = getVoices ; 
}  

// speak 
const speak = () => {
    // check if speaking 
    if(synth.speaking) {
        console.error ('already speaking ...') ;
        return ;
    } 
    if(textInput.value !==''){
        // get speak text 
        const speakText = new SpeechSynthesisUtterance(textInput.value) ; 
        // speak end 
        speakText.onend = e => {
            console.log('Done speaking ...') ;

        } 
        // check speak error 
        speakText.onerror = e => {
            console.error ('something went wrong') ;
        } 

        // selected voice 
        const selectedVoice = voiceSelect.selectedOptions[0] ;
        .getAttribute( ' data-name') ;   

        // loop trhough voices 
        voices.forEach(voices => {
            if(voice.name==selectedVoices) 
            {
                speakText.voice = voice ;
            }
        }) ;

        // set picth and rate 
        speakText.rate = rate.value ;
        speakText.pitch = pitch.value ;
        // speaki 
        synth.speak(speakText) ;

    } 
} ;

// EVENT LISTENER  
// TEXT FORM SUBMIT 
textForm.addEventListener('submit ' ,e =>{
    e.preventDefault() ;
    speak() ;
    textInput.getBoundingClientRect();

}) ;
// rate value change 
rate.addEventListener('change' , e => rateValue.textContent = rate.value) 
// pitch value change 
pitch.addEventListener('change' , e => pitchValue.textContent = pitch.value) 
// voice select change 
voiceSelect.addEventListener('change', e=>speak()) ;


