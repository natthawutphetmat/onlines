"use client"

import { useEffect, useState } from 'react';

export default function DataPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // เพิ่ม query parameter แบบสุ่มเพื่อป้องกันการแคช
        const response = await fetch(`/admin/api/getData?cachebuster=${new Date().getTime()}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>-- IP --</th>
            <th>-- Referrer --</th>
            <th>-- UIP --</th>
            <th>-- Time --</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
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
