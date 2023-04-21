
<template>
  <div class="componentDemo">
    <div class="returnValueDisplay">
      v-model Value:
      <pre>{{jsonResult}}</pre>
    </div>
    <div class="componentDiv">

      <MonthTogglePicker 
        v-model="returnedObjMonthToggle"
        :locale=localeSelect
        :text-mode=textModeSelect
        :selectionMode=selectionModeSelect
      ></MonthTogglePicker>
    </div>
    <div class="parameterSelection">
      <div>locale</div>
      <v-select 
      label="locale"
      :options="getComponentProps('MonthTogglePicker')[0].options"
      v-model="localeSelect"
      >
      </v-select>
      <div>textMode</div>
      <v-select 
        label="textMode"
        :options="getComponentProps('MonthTogglePicker')[1].options"
        v-model="textModeSelect"
      >
      </v-select>
        <div>selectionMode</div>
        <v-select 
        label="selectionMode"
        :options="getComponentProps('MonthTogglePicker')[2].options"
        v-model="selectionModeSelect"
        >
      </v-select>
    </div>
  </div>
</template>

<script>
  import { MonthTogglePicker } from './components';

  export default{
    data() {
      return{
        //use this object to populate the demo page of the library with v-for loops for 1 prop -> 1 collapsible
        libararyComponents:[
          {
            name: "MonthTogglePicker",
            props: [
              	{name: "locale", options:["en","de"]},
                {name: "textMode", options:["fullText", "abbreviated"]},
                {name: "selectionModes", options:["onConfirm", "onToggle"]}
            ]
          }
        ],
        localeSelect: "de",
        textModeSelect: "abbreviated",
        selectionModeSelect: "onToggle",
        returnedObjMonthToggle: [{year:2023, month:0}]
      }
    },
    computed:{
      jsonResult: function(){
        return this.outputJsonFormat(this.returnedObjMonthToggle)
      }
    },
    methods:{
      getComponentProps(componentName){
        return this.libararyComponents.find(e => e.name = componentName).props
      },
      outputJsonFormat(inp) {
        return JSON.stringify(inp, undefined, 4)
      }
    },
  }
</script>

<style scoped>
.componentDemo{
  display:flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
}
  .returnValueDisplay{
    border: 1px solid black;
    border-radius: 5px;
    margin: 1em;
    padding: 5px;
  }
  .componentDiv{
    border: 1px solid black;
    border-radius: 5px;
    margin: 1em;
    padding: 5px;

  }
  .parameterSelection{
    border: 1px solid black;
    border-radius: 5px;
    margin: 1em;
    padding: 5px;

  }

</style>
