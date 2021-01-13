<template>
    <canvas ref="canvas"></canvas>
</template>

<script>
import {Pie} from 'vue-chartjs'
export default {
	extends: Pie,
	props: ['label', 'value'],
	mounted() {
    this.setup()
  },
	methods: {
		setup() {
            this.renderChart({
                labels: this.label,
                datasets: [{
                    data: this.value,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            })
        }

	}
}
</script>