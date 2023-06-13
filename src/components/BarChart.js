class BarChart {
  constructor({ labels, dataSet, max, min }) {
    this.min = min;
    this.max = max;
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
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "red"
            }
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltips, data) => {
              const value =
                data.datasets[tooltips.datasetIndex].data[tooltips.index];
              return value.toLocaleString();
            }
          }
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: this.min || 0,
                max: this.max || 50
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
