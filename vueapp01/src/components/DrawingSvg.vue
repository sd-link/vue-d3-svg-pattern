<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <svg>
      <defs>
        <pattern id="pattern1" patternUnits="userSpaceOnUse" width="150" height="150">
          <image xlink:href="../assets/pattern1.jpeg" x="0" y="0"/>
        </pattern>
        <pattern id="pattern2" patternUnits="userSpaceOnUse" width="150" height="150">
          <image xlink:href="../assets/pattern2.jpeg" x="0" y="0"/>
        </pattern>
        <pattern id="pattern3" patternUnits="userSpaceOnUse" width="150" height="150">
          <image xlink:href="../assets/pattern3.jpeg" x="0" y="0"/>
        </pattern>
        <mask id="part1">
          <polygon  x="10" points="270,0  0,500 600,500" fill="#ffffff"/>
        </mask>
      </defs>
    </svg>
    <svg viewBox="0 0 800 800">
      <polygon class="pattern" x="10" points="270,0  0,500 600,500" fill="url(#pattern3)"/>
      <image class="part" xlink:href="../assets/pattern1.jpeg" width="800" height="800" style="mask:url(#part1)"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'DrawingSvg',
  data () {
    return {
      msg: 'Would you like this?'
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load: function () {
      console.log('dddd')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  }
  .pattern{
    mix-blend-mode: multiply;
  }
</style>
