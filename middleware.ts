export { auth as middleware } from '@/auth.ts';

export const config = {
	// Optionally, don't invoke Middleware on some paths
	// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
