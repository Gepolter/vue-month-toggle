# vue-month-toggle

[![downloads](https://img.shields.io/npm/dm/vue-month-toggle-component.svg)]()
[![npm-version](https://img.shields.io/npm/v/vue-month-toggle-component.svg)]()
[![license](https://img.shields.io/npm/l/express.svg)]()

## Vue3

Live Demo: <https://component-library-demo.vercel.app/>  
GitHub: <https://github.com/Gepolter/vue-month-toggle>  
npm: <https://www.npmjs.com/package/vue-month-toggle-component>  

This component generates a chronologically sorted array of JSON-objects containing month and year parameters

## Install
terminal
```
npm i vue-month-toggle-component
```
index.js
```
import { MonthTogglePicker } from 'vue-month-toggle-component';
import '../node_modules/vue-month-toggle-component/dist/style.css';

createApp(App)
    .component("MonthTogglePicker", MonthTogglePicker)
    .mount('#app')
```
Will change css import in later version. For now css has to be be imported via node_modules path

## Usage
```
<MonthTogglePicker 
  v-model="yourDataObject"
  :locale=yourLocaleStr
  :text-mode=yourTextModeStr
  :selectionMode=yourSelectionModeStr
>
</MonthTogglePicker>
```

## Props and v-model binding
```
props: [
    {name: "locale", options:["en","de", "fr", "sp", "jp"]},
    {name: "textMode", options:["fullText", "abbreviated"]},
    {name: "selectionMode", options:["onConfirm", "onToggle"]}
]
```
- locale: changes month names (default: "en")
- textMode: "abbreviated" displays only the three first letters of months (default: "abbreviated")
- selectionMode: change v-model either via confirm btn or with each toggled month

