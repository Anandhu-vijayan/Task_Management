import { NextResponse } from 'next/server';
import { verifyRefreshToken, generateAccessToken } from '../../lib/jwt';
import User from '../../models/user';

export async function POST(request) {
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findByPk(payload.userId);

    if (!user) {
      return NextResponse.json({ message: 'Invalid user' }, { status: 401 });
    }

    const newAccessToken = generateAccessToken(user);
    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 403 });
  }
}
