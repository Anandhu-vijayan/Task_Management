import { verifyAccessToken } from './jwt';
import { NextResponse } from 'next/server';

export function withAuth(handler, allowedRoles = []) {
  return async (request) => {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyAccessToken(token);
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
      }

      // Pass user info to route
      request.user = decoded;
      return handler(request);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }
  };
}
