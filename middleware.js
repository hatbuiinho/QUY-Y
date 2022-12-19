import { NextResponse } from "next/server";
import { getIronSession } from "iron-session/edge";
import iron_session from "configs/iron_session";

export const middleware = async (req) => {
	const res = NextResponse.next();
	const session = await getIronSession(req, res, iron_session);

	// do anything with session here:
	const { user } = session;

	console.log("from middleware", { user });
	console.log("req.url", req.url);

	if (!user && req.url.indexOf("/admin") > -1 && req.url.indexOf("/admin/login") < 0) {
		return NextResponse.redirect(new URL('/admin/login', req.url));
	} else if (user && user.admin && req.url.indexOf("/admin/login") > -1) {
		return NextResponse.redirect(new URL('/admin', req.url));
	} else if (!user && req.url.indexOf("/admin") < 0) {
		return NextResponse.redirect(new URL('/', req.url));
	} else if (user && !user.admin && req.url.indexOf("/admin") > -1) {
		return NextResponse.redirect(new URL('/', req.url));
	}
	return res;
};

export const config = {
	matcher: [
		'/admin/:path*',
		'/api/questions/:path*',
		'/ceremony/:path*',
		'/questions/:path*',
		'/meet/:path*'
	]
	// matcher: [
	// 	/*
	// 	 * Match all request paths except for the ones starting with:
	// 	 * - api (API routes)
	// 	 * - _next/static (static files)
	// 	 * - favicon.ico (favicon file)
	// 	 */
	// 	'/((?!api|_next/static|favicon.ico|.*.png|.*.jpg|.*.css).*)',
	// ],
};
