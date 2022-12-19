class BarChart {
    constructor({ labels, dataSet }) {
        this.labels = labels
        this.dataSet = dataSet
        this.$chart
        this.$container = document.createElement('div')
        this.$canvas = document.createElement('canvas')
    }
    render() {
        this.$container.innerHTML = ''
        this.$canvas.innerHTML = ''
        this.$container.appendChild(this.$canvas)
        if (this.$chart) this.$chart.destroy()
        this.$chart = new Chart(this.$canvas, {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: this.dataSet
            },
            options: { responsive: true }
        });

        return this.$container
    }
}
export default BarChart