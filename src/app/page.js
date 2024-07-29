"use client"

import { useEffect, useRef } from 'react';

export default function HomePage() {
  const hasLoggedRef = useRef(false);

  useEffect(() => {
    const logVisit = async () => {
      if (hasLoggedRef.current) return; // ป้องกันการเรียกใช้ซ้ำ
      hasLoggedRef.current = true;

      try {
        const referrer = document.referrer || 'Direct';
        const response = await fetch('/api/logIp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ referrer }),
        });

        if (!response.ok) {
          throw new Error(`Error logging visit: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error logging visit:', error);
      }
    };

    logVisit();
  }, []);

  return (
    <div className='text-center mt-5'>
      <a href='/admin' target='_blank'>admin</a>
    </div>
  );
}
