var optionProjects = {
  series: [{
    name: 'xp',
    data: []
  }],
  chart: {
    height: 300,
    type: 'bar',
    background: 'transparent'
  },
  plotOptions: {
    bar: {
      borderRadius: 3,
      columnWidth: '50%',
      colors: {
        ranges: [{
          from: 0,
          to: 100,
          color: '#ec9c61'
        }]
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 0
  },
  grid: {
    show: false
  },
  xaxis: {
    labels: {
      rotate: -45
    },
    categories: [],
    tickPlacement: 'on'
  },
  yaxis: {
    title: {
      text: 'Amounts',
    },
  },
  fill: {
    colors: ['#ec9c61']
  },
  title: {
    text: 'Xp per Project',
    align: 'center',
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#263238'
    }
  },
  tooltip: {
    enabled: false,
    y: {
      formatter: function(val) {
        return val
      },
      title: {
        formatter: function(seriesName) {
          return seriesName
        }
      }
    },
    style: {
      fontSize: '12px',
      fontFamily: 'Arial, sans-serif',
      color: '#000'
    }
  }
};



async function columnChart(project = []) {
  optionProjects.series[0].data = []
  optionProjects.xaxis.categories = []

  for (let i = 0; i < project.length; i++) {
    optionProjects.series[0].data.push(Math.round((project[i].amount)/1000))
    optionProjects.xaxis.categories.push(project[i].object.name)
  }

  console.log(optionProjects.series[0].data);
  console.log(optionProjects.xaxis.categories)

  var chart = new ApexCharts(document.querySelector("#projects"), optionProjects);
  await chart.render();
}

export { columnChart }