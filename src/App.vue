<template class="col">
  <div class="group-container">
    <!-- <b-navbar toggleable="lg" type="dark" variant="warning"> -->
    <div class="navbar">
      <h1 class="d-flex justify-content-start" style="color: Beige">
        Langslate
      </h1>
    </div>
    <!-- </b-navbar> -->
    <div class="home" v-if="!show">
      <div class="content">
        <img
          src="./assets/chat.svg"
          width="500"
          height="500"
          style="justify-content:center:margin-top:200px"
        />
        <div class="content-right">
          <h2>Language.Translate.Easy to use</h2>
          <h3>
            Langslate helps you translate words or sentences between a variety
            of language options. Copy the text in any language and hit the
            translate button to get the corresponding text in the other
            language.<br /><br />
            Happy learning.
          </h3>
          <b-button
            variant="light"
            size="lg"
            @click="showFunc"
            style="margin-left: 30%; margin-top: 100px"
          >
            Get started
          </b-button>
        </div>
      </div>
      <img src="./assets/Dots.svg" class="dots" width="200" height="200" />
    </div>
    <div id="app" class="group" v-if="show">
      <b-row class="mt-5 d-flex justify-content-center">
        <b-col md="6">
          <b-form-textarea
            v-model="fromText"
            placeholder="Enter text to be translated..."
            rows="4"
            max-rows="8"
          />
        </b-col>
      </b-row>
      <b-row class="mt-5 d-flex justify-content-center">
        <b-col md="3">
          <label style="color: #0e387a; font-weight: bold"
            >Translate from :</label>
          <b-form-select
            v-model="fromLanguage"
            :options="languageOptions"
            class="m-2"
            style="max-width: 250px"
          ></b-form-select>
        </b-col>
        <b-col md="3">
          <label style="color: #0e387a; font-weight: bold"
            >Translate to :</label
          >
          <b-form-select
            v-model="toLanguage"
            :options="languageOptions"
            class="m-2"
            style="max-width: 250px"
          ></b-form-select>
        </b-col>
      </b-row>
      <b-row class="d-flex justify-content-center">
        <b-col md="6">
          <b-button class="m2" variant="info" @click="translateText">
            Translate
          </b-button>
          &nbsp;
             <b-button class="m2" variant="info" @click="play">
            Translate to speech
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-5 d-flex justify-content-center">
        <b-col md="6">
          <textarea
            v-model="toText"
            placeholder="Translated text..."
            rows="3"
            cols="80"
            max-rows="6"
            disabled
          ></textarea>
        </b-col>
      </b-row>
      <b-row class="mt-3 d-flex justify-content-center">
        <b-col md="10">
          <div style="background-color:rgb(232, 238, 255);width:50%;position:absolute;top:100px;height:50%"/>
          <b-embed
            type="iframe"
            style="width: 50%; height: 40%;margin-left:25%"
            aspect="4by3"
            src="https://hodgef.com/simple-keyboard/demos/"
          ></b-embed>
        </b-col>
      </b-row>
       
    
    </div>

    <!-- <input
      v-if="showFunc"
      :value="input"
      class="input"
      @input="onInputChange"
      placeholder="Tap on the virtual keyboard to start"
    >
    <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" v-if="showFunc"/> -->
  </div>
</template>

<script>
import { Predictions } from "aws-amplify";
// import SimpleKeyboard from "./components/Keyboard";
export default {
  name: "App",
  data() {
    return {
      input: "",
      fromLanguage: "",
      toLanguage: "",
      fromText: "",
      toText: "",
      textforSpeech: this.toText,
      result: "",
      audio: "",
      show: false,
      languageOptions: [
        { value: "", text: "Please select an option" },
        { value: "af", text: "Afrikaans" },
        { value: "sq", text: "Albanian" },
        { value: "ar", text: "Arabic" },
        { value: "bn", text: "Bengali" },
        { value: "cs", text: "Czech" },
        { value: "zh", text: "Chinese" },
        { value: "da", text: "Danish" },
        { value: "en", text: "English" },
        { value: "fr", text: "French" },
        { value: "de", text: "German" },
        { value: "el", text: "Greek" },
        { value: "hi", text: "Hindi" },
        { value: "id", text: "Indonesian" },
        { value: "it", text: "Italian" },
        { value: "ja", text: "Japanese" },
        { value: "kn", text: "Kannada" },
        { value: "ko", text: "Korean" },
        { value: "ms", text: "Malay" },
        { value: "ml", text: "Malayalam" },
        { value: "pl", text: "Polish" },
        { value: "pt", text: "Portuguese" },
        { value: "ru", text: "Russian" },
        { value: "es", text: "Spanish" },
        { value: "ta", text: "Tamil" },
        { value: "tr", text: "Telugu" },
        { value: "th", text: "Thai" },
        { value: "tr", text: "Turkish" },
        { value: "vi", text: "Vietnamese" },
      ],
    };
  },
  methods: {
    async translateText() {
      let translation = await Predictions.convert({
        translateText: {
          source: {
            text: this.fromText,
            language: this.fromLanguage,
          },
          targetLanguage: this.toLanguage,
        },
      });
      this.toText = translation.text;
    },
    showFunc() {
      this.show = !this.show;
    },
   play(){
     var msg = new SpeechSynthesisUtterance();
      msg.text = this.toText;
      window.speechSynthesis.speak(msg);
   },

    //   async textToSpeech(){
    //       let Speech=await Predictions.convert({
    //         textToSpeech:{
    //           source:{
    //             text:this.textforSpeech,
    //             language: "es-MX"
    //           },
    //           voiceId:"Mia"
    //         }
    //       });
    //       console.log(Speech);
    //        this.textforSpeech=Speech.speech.url;
    //   },
    //   play(){
    //    if (this.textforSpeech.url) {
    //      console.log(this.textforSpeech.url);
    //     this.audio = new Audio();
    //     this.audio.src = this.textforSpeech.url;
    //     this.audio.play();
    //   }
    //  }
    onChange(input) {
      this.input = input;
    },
    onKeyPress(button) {
      console.log("button", button);
    },
    onInputChange(input) {
      this.input = input.target.value;
    },
  },
};
</script>

<style>
input {
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 20px;
  border: none;
  box-sizing: border-box;
}

.simple-keyboard {
  max-width: 850px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.group-container {
  background-color: #a8c7fc;
  margin: 0;
  width: 100%;
  height:40%;
}
.navbar {
  background: #0e387a;
  box-shadow: 5px 5px 10px rgb(29, 19, 65);
}
.content {
  display: flex;
  gap: 1rem;
  margin-top: 100px;
}
.content h2 {
  margin-left: 200px;
}
.content h3 {
  text-justify: distribute;
  margin-left: 200px;
  /* color: #000; */
  width: 50%;
  text-align: justify;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 50px;
}
.group {
  background: rgb(232, 238, 255);
  opacity: 0.9;
  margin: 50px;
  padding: 20px;
  border-radius: 10px;
}
.m2 {
  margin-top: 80px;
}
.image img {
  justify-content: flex-end;
  align-items: flex-end;
}

.home .dots {
  margin-top: 88px;
  overflow: hidden;
  margin-left: 87%;
}
</style>
