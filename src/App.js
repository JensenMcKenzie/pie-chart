import './App.css';
import { useState } from 'react';
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

const dataList = [
  { name: "First", amount: 70, color: "#0033ad"},
  { name: "Second", amount: 30, color: "#00ffbd"},
  { name: "Third", amount: 10, color: "#F7931A"},
];

function clicked(){
  console.log('x');
}

function App() {
  const [active, setActive] = useState(null);
  const width = 500;
  const half = width/2;
  return (
    <main>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={dataList}
            pieValue={data => data.amount}
            outerRadius={half}
            innerRadius={({data}) => {
              const size = active && active.name == data.name ? 20:12;
              return half - size;
            }}
            padAngle={0.01}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.symbol}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>

          {active ? (
            <>
              <Text textAnchor="middle" fill="#000" fontSize={40} dy={-20}>
                {`${active.name}`}
              </Text>

              <Text
                textAnchor="middle"
                fill={active.color}
                fontSize={20}
                dy={20}
              >
                {`${active.amount}`}
              </Text>
            </>
          ) : (
            <>
              <Text textAnchor="middle" fill="#000" fontSize={20} dy={20} onClick={clicked}>
                {`${dataList.length} Teams`}
              </Text>
            </>
          )}  
        </Group>
      </svg>
    </main>
  );
}

export default App;
