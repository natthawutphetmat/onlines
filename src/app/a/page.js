"use client"

import { useEffect, useState } from 'react';

export default function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://online.myadsdeps.com/get');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const result = await response.json();
        if (!Array.isArray(result.results)) {
          console.error('Expected an array but got:', result);
          setData([]);  // ตั้งค่าให้เป็นอาร์เรย์ว่างถ้าผลลัพธ์ไม่ใช่อาร์เรย์
        } else {
          // กรองข้อมูลที่มี ip หรือ uip เป็นค่าว่างออกไป
          const filteredData = result.results.filter(item => item.ip && item.uip);
          setData(filteredData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="container"><p>Loading data...</p></div>;
  }

  return (
    <div className='container'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">IP</th>
            <th scope="col">Referrer</th>
            <th scope="col">UIP</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.ip}</td>
              <td>{item.referrer}</td>
              <td>{item.uip}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
