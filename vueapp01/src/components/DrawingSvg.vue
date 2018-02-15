<template>
  <div class="main-container">
    <h1>{{ msg }}</h1>
    <div class="preview-container">
      <svg viewBox="0 0 500 600">
        <defs>
          <!-- pattern -->
          <pattern v-for="item in ptnList" :id="item.id" :key="item.id" patternUnits="userSpaceOnUse" :width="item.width" :height="item.height">
            <image :xlink:href="getImgUrl(item.src)" :width="item.width" :height="item.height"/>
          </pattern>
          <!-- filter -->
          <filter id="filter1" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0"/>
          </filter>
        </defs>
        <!-- main image -->
        <image class="main" xlink:href="../assets/hoodie1.jpg" x="-19" width="412" height="470"/>
        <!-- hover material -->
        <path v-for="(item) in objList" :key="item.id + '_over'" :id="item.id + '_over'" class="part_over" :d="item.d"/>
        <!-- patterned material -->
        <path v-for="(item,index) in objList" :key="item.id" :id="item.id" class="part" :fill="'url(#' + item.ptnId +')'" :d="item.d" v-on:click="setSelectedObject(index)"/>
      </svg>
    </div>  
    <!-- pattern list panel -->
    <div class="pattern-panel">
      <ul>
        <li v-for="item in ptnList" :key="item.id" v-on:click="changePattern(item.id)" >
          <div :class="'pattern-rect pattern-' + item.id">
            <img :src="getImgUrl(item.src)" />
          </div>
          <div class="pattern-name">
            {{item.id}}
          </div>
        </li>
      </ul>
    </div>
    <h2 class='text-rec'>Selected: {{ objList[selObj].id }}</h2>
  </div>
</template>

<script>

import * as d3 from 'd3'
export default {
  name: 'DrawingSvg',
  data () {
    return {
      msg: 'Would you like this?',
      selObj: 0,
      objList: [ { id: 'RightArm', ptnId: 'pattern6', d: 'M91,272s1-12-1-15a77.62,77.62,0,0,1-4-7l-1-8-6-2-1-13,2-8,1-11-5-5v-6l4-6,3-3-2-17-2-9H72l-3-2-4-8s-2-19-2-20-3-14-3-14l-15-8-7-7-3-6-4-5-3-2-3,2-4,10-9,26L6,148,4,158l-1,7L1,186v4l-1,9v11l2,4,3,2,5,2,2,4v9l2,2,4,12,4,13,4,13,3,7,7,6,6,6,3,5,4,6,6,4H65l-7-7s-.33-10.67,2-15,4.33-11.33,9-13a95,95,0,0,1,13-3Z' },
        { id: 'Pocket', ptnId: 'pattern6', d: 'M99.67,296.33l-11,15.34-6,11-3.67-4v5.66l-1.67,27-1,21.34,5.34,9,9,2.66L102.33,387l12.34,4,64.66,1,58-2.33L259,390l13.33-5,14-7L286,320.67l-7.33-15.34-15-25.33L257,267.33l-22-.66-51.67-4.34s-33.73,3.55-34.66,3.67c-8,1-32,5.33-28,.33,1.71-2.14-13,18-13,18Z' },
        { id: 'LeftArm', ptnId: 'pattern6', d: 'M372,183v-7.33L370.67,167l-17-46.33L340.33,78l-8.66,12.33-14,16L316,135.67l-10,8.66-5,17L291.67,181l7,7.33.66,5,2,4-3,4-2.33,4-.33,3,3,5.67L297,223.33l.67,9L293.33,238,290,243.33,285.33,250l-2,5L283,268.33l7.46-1.27,6.21-1.06,8.33,7.33,3.67,9.34,1.66,10.66L307,300.67l3.33,3,9-.34,5.34-4.33,9-4.33,5-7.67L345,275.33l1-13,4.33-16L356.67,236l3.66-7.67,2-11.66,2.34-6s7.7-7.06,7.66-8C372,195,372,183,372,183Z' },
        { id: 'Main', ptnId: 'pattern6', d: 'M91,272s1-12-1-15a77.62,77.62,0,0,1-4-7l-1-8-6-2-1-13,2-8,1-11-5-5v-6l4-6,3-3-2-17-2-9H72l-3-2-4-8s-2-19-2-20-3-14-3-14l-15-8-7-7-3-6-4-5-4.33-.67L45.33,59l15-16.67,13.34-7.66,16.33-9,17.67-10,10,5.33,27.66,16.33,22,13L174.67,55l10,10,4,3.67L193.33,67l4.34-11L208,49.37,224.67,39,249,27.33l21.33-10,10,5.67L285,25l9.67,7,12.66,5,11.34,6.67,10,12.66L335,66.67,340.33,78l-8.66,12.33-14,16L316,135.67l-10,8.66-5,17L291.67,181l1.66,57-4,6.67-4,5.33-2,5L283,268.33,277.33,273l-13.66,7L257,267.33l-22-.66-51.67-4.34s-33.73,3.55-34.66,3.67c-8,1-32,5.33-28,.33,1.71-2.14-13,18-13,18Zm195,48,5-8,5-2v59l-5,5-5,4ZM77,373l-5-9-3-23V325l1-14,10,8-2,25Z' },
        { id: 'Term', ptnId: 'pattern6', d: 'M105,283,92,272l-9-4-6-1-7,2-5,4-5,9-2,9v6l4,5,8,7,3,4,5,5s-.33-7.33,0-9,2.67-9.33,7-14a68.83,68.83,0,0,1,11-9Zm161-5s7.33,0,9,1,6.33,1.33,9,5,6,6.33,7,11,2,13,2,13l-1,4,9-6,7-6s2.67-7.33,2-12-2.33-10.67-5-15-7.67-7-10-7-12,3-12,3ZM73,366l6,11s1.33,3,3,4,11,4,11,4l22,5,29,.67L181,392l44-2h31s11.33-2.33,16-5,14-7,14-7l6-5,5-5,1,10,2,10v7s-1,5.33-2,5-7,5.67-11,8-7,4-7,4l-18,4-23,3-38,4-12,2-4-2-3-1-3,2-24-4s-21-.67-24-1-20.33-1.67-23-2-15-3-15-3a39.88,39.88,0,0,1-8-4c-3.33-2.33-7-5-7-5l-5-5-3-8v-5l2-5ZM185,65s-.67-8.33-4-13-10-10-10-10l-3-2-2-2V34s-8-11.67-9-13S147,0,147,0H116l-3,3-4,4s-2.67,2-3,3,1,6,1,6l44,25,13,8,7,4,9,8Zm8,0s3-11,3-12,9-12,9-12l3-4,5,1a4.53,4.53,0,0,0,1-2,15.23,15.23,0,0,0,0-4l5-6,3-13,3-5,1-8h31l4,7,4,3a45.33,45.33,0,0,1,6,4,3.55,3.55,0,0,1,1,3l-5,3L230,37,207,51l-9,5Z' } ],
      ptnList: [ {id: 'pattern1', src: 'pattern1.png', width: 100, height: 100 },
        {id: 'pattern3', src: 'pattern3.png', width: 100, height: 100 },
        {id: 'pattern4', src: 'pattern4.png', width: 100, height: 100 },
        {id: 'pattern5', src: 'pattern5.png', width: 100, height: 100 },
        {id: 'pattern6', src: 'pattern6.png', width: 580, height: 580 },
        {id: 'pattern7', src: 'pattern7.jpeg', width: 100, height: 100}]
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load: function () {
    },
    getImgUrl(fn) {
      var images = require.context('../assets/', false, /\.(png|jpe?g|gif|svg)(\?.*)?$/)
      return images('./' + fn)
    },
 
    changePattern (patternId) {
      this.objList[this.selObj].ptnId = patternId
      this.upgradePatternSelection()
      
      var over_id = this.objList[this.selObj].id + '_over'
      d3.select('#'+over_id).classed('run_animation_double', true)
 
    },
    setSelectedObject(selectedObjectIndex){
      this.selObj = selectedObjectIndex
      this.upgradePatternSelection()
     
      var over_id = this.objList[this.selObj].id + '_over'
      d3.select('#'+over_id).classed('run_animation_single', true)


    },
    upgradePatternSelection(){
      $('.selected-item').removeClass('selected-item')
      $('.pattern-' + this.objList[this.selObj].ptnId).addClass('selected-item')
      setTimeout(function(){
        $('.run_animation_single').removeClass('run_animation_single')
        $('.run_animation_double').removeClass('run_animation_double')
      }, 700)      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;
  }
  .preview-container {
    max-width: 600px;
    max-height: 500px;
    min-width: 400px;
    width: 100vw;
    height: 100vh;
  }
  .main-canvas {
    width: 345px;
    height: 500px;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .part{
    mix-blend-mode: multiply;
    opacity: 0.85;
    box-shadow: 0px 0px 10px white;
    cursor: pointer;
  }
  .part:hover{
    stroke: #0086c3;
    opacity: 1.0;
    stroke-width: 2.5px;
    -webkit-transition-duration: 0.1s; /* Safari */
    transition-duration: 0.1s;  
  }
  .part_over {
    mix-blend-mode: multiply;
    opacity: 0.0;
    /* -webkit-transition-duration: 0.2s; /* Safari */
    /* transition-duration: 0.1s; */
  }
  .run_animation_single {
    -webkit-animation-name: single_frm; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 0.5s; /* Safari 4.0 - 8.0 */
    animation-name: single_frm;
    animation-duration: 0.5s;
  }
  .run_animation_double {
    -webkit-animation-name: double_frm; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 0.7s; /* Safari 4.0 - 8.0 */
    animation-name: double_frm;
    animation-duration: 0.7s;
  }

  @keyframes double_frm {
    0% {fill: #29b6f6; opacity: 1.0;}
    100% {fill: white; opacity: 0.0;}
  }
  @keyframes single_frm {
    0% {fill: #29b6f6; opacity: 1.0;}
    100% {fill: white; opacity: 0.0;}
  }  

  @-webkit-keyframes double_frm {
    0% {fill: #29b6f6; opacity: 1.0;}
    100% {fill: white; opacity: 0.0;}
  }
  @-webkit-keyframes single_frm {
    0% {fill: #29b6f6; opacity: 1.0;}
    100% {fill: white; opacity: 0.0;}
  } 
  .pattern-panel {
    position: fixed;
    top: 100px;
    right: 10px;
    width: 5em;
  }    
  .pattern-panel ul {
    list-style-type: none;
  }
  .pattern-panel li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    flex-wrap: wrap;
  }
  .pattern-panel li:hover .pattern-rect{
    border: 2px solid rgb(0, 38, 255)
  }
  .pattern-rect {
    width: 3em;
    height: 3em;
    overflow: hidden;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .pattern-name {
    font-size: 0.8em;
  }
  .selected-item {
    border: 2px solid rgb(255, 0, 242)
  }
  .text-rec {
    background-color: bisque;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid gray
  }

 
 

 </style>
