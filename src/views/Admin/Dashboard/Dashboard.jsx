import { Line } from '@ant-design/plots'; 

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const config = {
  data,
  width: 800,
  height: 400,
  autoFit: false,
  xField: 'year',
  yField: 'value',
  point: {
    size: 5,
    shape: 'diamond',
  },
  label: {
    style: {
      fill: '#aaa',
    },
  },
};

let chart;

// Export Image
const downloadImage = () => {
  chart?.downloadImage();
};

// Get chart base64 string
const toDataURL = () => {
  console.log(chart?.toDataURL());
};

const Dashboard = () => {
  return (
    <>
      <div>Dashboard</div>
      <div>
        <button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
          Export Image
        </button>
        <button type="button" onClick={toDataURL}>
          Get base64
        </button>
        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
    </div>
    </>
  )
}

export default Dashboard