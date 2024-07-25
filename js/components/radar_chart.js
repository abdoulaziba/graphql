var optionSkills = {
  series: [{
    name: 'Series 1',
    data: [],
  }],
  chart: {
    height: 300,
    type: 'radar',
    background: 'transparent' // Enlever le fond du graphique
  },
  dataLabels: {
    enabled: true
  },
  plotOptions: {
    radar: {
      size: 85,
      polygons: {
        strokeColors: ['#e9e9e9', 'transparent'], // Afficher la première ligne circulaire
        connectorColors: '#e9e9e9', // Garder les lignes des axes
        fill: {
          colors: [] // Enlever les couleurs de fond
        }
      }
    }
  },
  title: {
    text: 'Skills',
    align: 'center', // Aligner le titre au centre
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#263238'
    }
  },
  colors: ['#ec9c61'],
  markers: {
    size: 4,
    colors: ['#fff'],
    strokeColor: '#FF4560',
    strokeWidth: 2,
  },
  tooltip: {
    y: {
      formatter: function(val) {
        return val
      }
    }
  },
  xaxis: {
    categories: []
  },
  yaxis: {
    show: true,
    labels: {
      formatter: function(val, i) {
        if (i === 0) { // Afficher uniquement le premier label
          return val
        } else {
          return ''
        }
      }
    }
  }
};


async function radarChart(skills = []) {
  optionSkills.series[0].data = [];
  optionSkills.xaxis.categories = [];

  for (let i = 0; i < skills.length; i++) {
    optionSkills.series[0].data.push(skills[i].amount);
    optionSkills.xaxis.categories.push(skills[i].type);
  }

  var chart = new ApexCharts(document.querySelector("#skills"), optionSkills);
  await chart.render();
}

export { radarChart }
