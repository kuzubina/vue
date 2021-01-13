<template>
	<canvas ref="canvas"></canvas>
</template>

<script>
import {Bar} from 'vue-chartjs'
export default {
	extends: Bar,
	props: ['label', 'value'],
	mounted() {
    this.setup()
  },
	methods: {
		setup() {
        this.renderChart({
          labels: this.label,
          datasets: [
            {
              label: 'за 7 дней',
              backgroundColor: '#35c28d',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#35c28d',
              data: this.value
            }
          ]
        })
    }

	}
}
</script>