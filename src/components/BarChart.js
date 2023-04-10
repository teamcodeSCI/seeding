class BarChart {
  constructor({ labels, dataSet }) {
    this.labels = labels;
    this.dataSet = dataSet;
    this.$chart;
    this.$container = document.createElement("div");
    this.$canvas = document.createElement("canvas");
  }
  render() {
    this.$container.innerHTML = "";
    this.$canvas.innerHTML = "";
    this.$container.appendChild(this.$canvas);

    this.$chart = new Chart(this.$canvas, {
      type: "bar",
      data: {
        labels: this.labels,
        datasets: this.dataSet
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 50
              }
            }
          ]
        }
      }
    });

    return this.$container;
  }
}
export default BarChart;
