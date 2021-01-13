<template>
	<canvas ref="canvas"></canvas>
</template>

<script>
import {Pie} from 'vue-chartjs'
export default {
	extends: Pie,
	props: ['value'],
	mounted() {
    this.setup()
  },
	methods: {
    getColors(length) {
      const RGBColorsArr = ['#d0fffd', '#fcffdf', '#ffddff', '#eaddff', '#c9fffd', '#d8ffdb', '#ffdcbd', '#ffcbbe', '#ffd7fe', '#b1ffce', '#b2e8ff', '#d3ff8b', '#d4c7ff', '#efc3ff', '#e7ffc0', '#fff89e'];
      var newColors = [];

      for(var i = 0; i < length; i++) {
          var idx = Math.floor(Math.random() * length);
          newColors.push(RGBColorsArr[idx]);
          RGBColorsArr.splice(idx, 1);
      }

      return newColors

    },
		setup() {
      console.log(this.value[0])
        this.renderChart({
          labels: this.value[0],
          datasets: [
            {
              label: 'По группам',
              backgroundColor: this.getColors(this.value[0].length),
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#35c28d',
              data: this.value[1]
            },
          ]
        })
    }

	}
}
</script>