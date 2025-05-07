// app/api/register/route.js
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import  User  from '../../models/user.js';

export async function POST(request) {
  const { name, email, password } = await request.json();
  console.log('Received values:', { name, email, password });

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await User.create({
      name,
      email,
      password: hashedPassword,
      user_id: userId,
      role: 'user',
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


// // app/api/register/route.js
// import { v4 as uuidv4 } from 'uuid';
// import bcrypt from 'bcrypt';
// import { NextResponse } from 'next/server';
// import pool from '../../lib/db'

// export async function POST(request) {
//   const { name, email, password } = await request.json();
//   console.log('Received values:', { name, email, password }); // add this

//   try {
//     const checkUser = await pool.query('SELECT * FROM user_management WHERE email = $1', [email]);
//     if (checkUser.rows.length > 0) {
//       return NextResponse.json({ message: 'User already exists' }, { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const userId = uuidv4();

//     await pool.query(
//       'INSERT INTO user_management (name, email, password, user_id, role) VALUES ($1, $2, $3, $4, $5)',
//       [name, email, hashedPassword, userId, 'user']
//     );

//     return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }


