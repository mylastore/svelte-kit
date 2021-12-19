export const variables = {
	env: import.meta.env.VITE_ENV,
	apiDevPath: import.meta.env.VITE_API_DEVELOPMENT_PATH,
	apiLivePath: import.meta.env.VITE_API_PRODUCTION_PATH,
	appName: import.meta.env.VITE_APP_NAME,
	currencyLocation: {symbol: "$", code: 'USA'},
	analyticsID: import.meta.env.VITE_APP_ANALYTICS,
}
