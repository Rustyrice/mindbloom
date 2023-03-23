import React, { useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme,VictoryLine  } from 'victory';
import InputSpinner from 'react-bootstrap-input-spinner';


const SleepTracker = () => {
  const [hoursSlept, setHoursSlept] = useState(0);
  const [sleepGoal, setSleepGoal] = useState(8);
  const [sleepHistory, setSleepHistory] = useState([]);

  // Function to add sleep data to the history
  const addSleepData = () => {
    setSleepHistory([...sleepHistory, { date: new Date(), hours: hoursSlept }]);
  };

  return (
    <div className="sleep-tracker">
      {/* Counter for hours slept */}
      <div>
        <h2>Hours slept:</h2>
        <InputSpinner
          type={'real'}
          precision={2}
          value={hoursSlept}
          onChange={(num) => setHoursSlept(num)}
          min={0}
          step={0.5}
        />
        <button onClick={addSleepData}>Add to history</button>
      </div>

      {/* Graph for sleep history */}
      <div style={{blockSize: "600px", alignItems:"left"}}>
        <h2>Sleep history</h2>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={10}
          scale={{ x: 'time' }}
        >
          <VictoryAxis
            tickValues={sleepHistory.map((data) => data.date)}
            tickCount={5}
            tickFormat={(t) => `${t.getDate()}/${t.getMonth()+ 1}`}
            style={{
              tickLabels: {
                angle: -45,
                textAnchor: 'end',
                fontSize: 12,
                padding: 5,
              },
            }}
          />
          <VictoryAxis dependentAxis tickFormat={(t) => `${t} hrs`} />
          <VictoryBar
            data={sleepHistory}
            x="date"
            y="hours"
          />
          <VictoryLine
            style={{
              data: { stroke: 'red', strokeWidth: 2 },
              labels: { fill: 'red', fontSize: 12 },
            }}
            y={() => sleepGoal}
            labels={['Sleep goal']}
          />
        </VictoryChart>
      </div>

      {/* Counter for sleep goal */}
      <div>
        <h2>Sleep goal:</h2>
        <InputSpinner
          type={'real'}
          precision={2}
          value={sleepGoal}
          onChange={(num) => setSleepGoal(num)}
          min={0}
          step={0.5}
        />
      </div>
    </div>
  );
};

export default SleepTracker;