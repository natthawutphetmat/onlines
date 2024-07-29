// app/api/getData/route.js

import { NextResponse } from 'next/server';
import { createConnection } from 'mysql2/promise';

export async function GET() {
  try {
    // สร้างการเชื่อมต่อกับฐานข้อมูล
    const connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // ดึงข้อมูลจากตาราง users
    const [rows] = await connection.execute('SELECT * FROM users');

    await connection.end();

    // ส่งข้อมูลกลับ
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}
