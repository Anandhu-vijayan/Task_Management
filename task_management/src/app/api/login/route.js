import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import { generateAccessToken, generateRefreshToken } from '../../lib/jwt.js';

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await User.findOne({ where: { email } });
  if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const response = NextResponse.json({ message: 'Login successful', role: user.role });

  response.cookies.set('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 15,
  });

  response.cookies.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
