export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.ico","img/1.webp","img/github.svg","robots.txt","service-worker.js"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".webp":"image/webp",".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		entry: {"file":"start-c5932678.js","js":["start-c5932678.js","chunks/index-30349cbd.js","chunks/index-dbf04213.js","chunks/preload-helper-e4860ae8.js","chunks/singletons-d1fb5791.js"],"css":[]},
		nodes: [
			() => import('./server/nodes/0.js'),
			() => import('./server/nodes/1.js'),
			() => import('./server/nodes/7.js'),
			() => import('./server/nodes/2.js'),
			() => import('./server/nodes/6.js'),
			() => import('./server/nodes/8.js'),
			() => import('./server/nodes/9.js'),
			() => import('./server/nodes/3.js'),
			() => import('./server/nodes/4.js'),
			() => import('./server/nodes/5.js'),
			() => import('./server/nodes/10.js'),
			() => import('./server/nodes/11.js'),
			() => import('./server/nodes/12.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "admin",
				pattern: /^\/admin\/?$/,
				names: [],
				types: [],
				path: "/admin",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "forgot",
				pattern: /^\/forgot\/?$/,
				names: [],
				types: [],
				path: "/forgot",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "login",
				pattern: /^\/login\/?$/,
				names: [],
				types: [],
				path: "/login",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				id: "register",
				pattern: /^\/register\/?$/,
				names: [],
				types: [],
				path: "/register",
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				id: "admin/settings",
				pattern: /^\/admin\/settings\/?$/,
				names: [],
				types: [],
				path: "/admin/settings",
				shadow: null,
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				id: "admin/user/[id]",
				pattern: /^\/admin\/user\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,8],
				b: [1]
			},
			{
				type: 'page',
				id: "admin/users/[p]",
				pattern: /^\/admin\/users\/([^/]+?)\/?$/,
				names: ["p"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,9],
				b: [1]
			},
			{
				type: 'page',
				id: "user/activation/[token]",
				pattern: /^\/user\/activation\/([^/]+?)\/?$/,
				names: ["token"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,10],
				b: [1]
			},
			{
				type: 'page',
				id: "user/profile/[username]",
				pattern: /^\/user\/profile\/([^/]+?)\/?$/,
				names: ["username"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,11],
				b: [1]
			},
			{
				type: 'page',
				id: "user/reset/[token]",
				pattern: /^\/user\/reset\/([^/]+?)\/?$/,
				names: ["token"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,12],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
