
<script>
import { Bar} from 'vue-chartjs'

export default {
  props: ['chartData', 'options'],
  extends: Bar,
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

