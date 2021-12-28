import React from 'react'
import ReactApexChart from 'react-apexcharts'
      
      
class ApexChart extends React.Component {
constructor(props) {
    super(props);

    this.state = {
    
    series: [props.percent],
    options: {
        plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: {
            margin: 14,
            size: '60%',
            background: '#283046',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            },
            track: {
            background: '#283046',
            strokeWidth: '40%',
            margin: 10, 
            dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                blur: 0,
                opacity: 0.5
              }
            },
        
            dataLabels: {
            show: true,
            name: {
                show: false,
            },
            value: {
                color: '#fff',
                fontSize: '40px',
                show: true,
            }
            }
        }
        },
        fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 0.5,
            gradientToColors: ['#2ecb77'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        }
        },
        stroke: {
        lineCap: 'round'
        },
        labels: ['Calo'],
    },
    
    
    };
}



    render() {
        return (
            <div id="card">
                <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={260} />
                </div>
            </div>
        );
}
}

export default ApexChart