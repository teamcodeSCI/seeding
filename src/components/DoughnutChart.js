class DoughnutChart {
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

        this.$chart = new Chart(this.$canvas, {
            type: 'doughnut',
            data: {
                labels: this.labels,
                datasets: this.dataSet
            },
            options: { responsive: true, legend: false }
        });

        return this.$container
    }
}
export default DoughnutChart