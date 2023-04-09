import { Button } from "reactstrap";
import { LineChart, AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useHistory } from "react-router-dom";

function Overview({ title = "No title", AvgPoints = "null", subject = "no subject", subjectNum = "null", navigate="revision-landing-page"}, ) {

    const history = useHistory();

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

  return (
    <div style={{border: "1px solid black", padding: "10px", borderRadius: "5px", border: "0.5px solid #ebebeb" ,boxShadow: "3px 3px 5px #d1d1d1"}}>
      <p style={{fontWeight: "bold"}}>{title}</p>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        {/* <div style={{display: "flex", flexDirection: "column"}}> */}
            <ResponsiveContainer width="90%" height={200}>
                <AreaChart
                    data={data}
                    margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="4 20" />
                    <XAxis dataKey="name" stroke="#d1d1d1"/>
                    <YAxis stroke="#d1d1d1"/>
                    <Tooltip />
                    {/* <Legend /> */}
                    <Area type="monotone" dataKey="uv" troke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        {/* </div> */}

        <div style={{ display: "flex", flexDirection: "column", width: "40%", marginLeft: "20px"}}>
            <p>Avg. points: {AvgPoints}</p>
            <p>{subject}: {subjectNum}</p>
        </div>

      </div>
      <Button style={{width: "100%"}} onClick={() => history.push(navigate)}> View </Button>
    </div>
  );
}

export default Overview;