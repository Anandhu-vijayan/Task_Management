import { withAuth } from '../../lib/authMiddleware';

const handler = async (request) => {
  return new Response(JSON.stringify({
    message: 'You have accessed a protected route!',
    user: request.user
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET = withAuth(handler, ['admin', 'user']);
