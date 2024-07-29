// app/api/logIp/route.js

import { NextResponse } from 'next/server';
import { createConnection } from 'mysql2/promise';

export async function POST(req) {
  try {
    const { referrer } = await req.json();
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || req.connection.remoteAddress;

    if (!ip) {
      return NextResponse.json({ message: 'Could not determine IP address' }, { status: 400 });
    }

    const connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    const [rows] = await connection.execute('SELECT EXISTS(SELECT 1 FROM users WHERE ip = ?) AS exist', [ip]);
    const exists = rows[0].exist;

    let uip = '';
    if (exists) {
      uip = ip;
    }

    await connection.execute(
      'INSERT INTO users (ip, referrer, uip) VALUES (?, ?, ?)',
      [ip, referrer, uip]
    );

    await connection.end();

    return NextResponse.json({ message: 'Visit logged successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error logging visit:', error);
    return NextResponse.json({ message: 'Error logging visit' }, { status: 500 });
  }
}
