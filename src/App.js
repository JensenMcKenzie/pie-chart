import './App.css';
import { useState, useEffect } from 'react';
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDtEyhd3w9ca5_Dqn1Ijjc1eKHmXApDrLM",
  authDomain: "cool-a115e.firebaseapp.com",
  databaseURL: "https://cool-a115e.firebaseio.com",
  projectId: "cool-a115e",
  storageBucket: "cool-a115e.appspot.com",
  messagingSenderId: "211300088138",
  appId: "1:211300088138:web:e8e9506ec7febc44f469b3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [active, setActive] = useState(null);
  const [menu, setMenu] = useState(false);
  const [items, setItems] = useState([]);
  const width = 500;
  const half = width/2;

  async function getData(db) {
    const dataCol = collection(db, 'ItemList');
    const dataSnap = await getDocs(dataCol);
    const dataList = dataSnap.docs.map(doc => doc.data());
    console.log(dataList);
    setItems(dataList);
  }


  useEffect(() => {
    getData(db);
  }, []);

  function clicked(){
    setMenu(!menu);
  }

  return (
    <main>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={items}
            className="pie"
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
                    key={arc.data.name}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color} className="arc"></path>
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
                {`${items.length} Teams`}
              </Text>
            </>
          )}
        </Group>
      </svg>
      {menu ? (<label className='menu'>Scroll list</label>) : null}
    </main>
  );
}

export default App;
