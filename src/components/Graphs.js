import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';


// This graph will be used to display the amount of points a user has earned over time (in a week)
export const AreaGraph = ({ data, goal = true, quality = false, width = 730, height = 250, margin={ top: 10, right: 30, left: 0, bottom: 0 }, measure = "value" }) => {

    // format a date object into a yyyy-mm-dd string
    const formattedDate = (date) => {
        var date = new Date(date); // Get the current date

        // Get the year, month, and day
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });

        var formattedDate = year + "-" + month + "-" + day; // Generate yyyy-mm-dd date string

        return formattedDate;
    }

    // get the dates for each day of the week
    const weekDates = () => {
        var date = new Date(); // Get the current date

        // Get monday of the current week
        var day = date.getDay(); // Get the current day of the week, 0 = sunday, 1 = monday, etc.
        var diff = date.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday

        date = new Date(date.setDate(diff)); // set date to monday of the current week
    
        var dates = [];
        for (var i = 0; i < 7; i++) {
            dates.push(formattedDate(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }

    // get the data for each day of the week
    const formatWeekData = (data) => {

        if (data == null) {
            return []
        } else if (data.length == 0) {
            return []
        }


        var weekData = [];
        var week = weekDates();

        for (var i = 0; i < week.length; i++) {
            var day = new Date(week[i]).getDay();

            switch (day) {
                case 0:
                    day = "Sun";
                    break;
                case 1:
                    day = "Mon";
                    break;
                case 2:
                    day = "Tue";
                    break;
                case 3:
                    day = "Wed";
                    break;
                case 4:
                    day = "Thu";
                    break;
                case 5:
                    day = "Fri";
                    break;
                case 6:
                    day = "Sat";
                    break;
            }

            var dayObj = {day: day, amount: 0, quality: null, goal_amount: 0, user_id: data[0].user_id};
            var date = week[i];
            var dayData = data.filter((item) => item.date == date);
            if (dayData.length > 0) {
                dayData[0].day = day;
                weekData.push(dayData[0]);
            } else {
                weekData.push(dayObj);
            }
        }

        return weekData;
    }

    // Custom tooltip for the graph, i.e. the popup that appears when you hover over a point
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip" style={{backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                <p className="desc">Amount: {payload[0].payload.amount}</p>
                {goal && <p className="desc">Goal: {payload[0].payload.goal_amount}</p>}
                {quality && <p className="desc">Quality: {payload[0].payload.quality}</p>}
            </div>
          );
        }
    };


    return (
        <AreaChart width={width} height={height} data={formatWeekData(data)} margin={margin}>
            <defs>
                <linearGradient id="colourAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGoalAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
            </defs>

            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip cursor={{fill: '#fff'}} content={<CustomTooltip />} />
            <Area type="monotone" dataKey={measure} stroke="#8884d8" fillOpacity={1} fill="url(#colourAmount)" />

            {goal && <Area type="monotone" dataKey="goal_amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorGoalAmount)" />}
            {goal && <Legend />}

        </AreaChart>

    )
}


export const healthMeter = (value, data, cx, cy, iR, oR, color) => {
    const RADIAN = Math.PI / 180;

    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    if (value >= 600) {
      color = '#00C49F';
    } else if (value >= 400) {
      color = '#FFFF00';
    } else if (value >= 100) {
      color = '#FFBB28';
    } else {
      color = '#ff0000';
    }

    return [
      <circle cx={x0} cy={y0} r={r} fill="gray" stroke="none" />,
      <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill="gray" />,
    ];
};