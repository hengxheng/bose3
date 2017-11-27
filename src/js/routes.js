import AppRoot from './containers/app';
import Home from './containers/HomePage';
export const routes = [
    {
        component: AppRoot,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/home',
                exact: true,
                component: Home
            },
            {
                path: "*",
                component: Home
            }
        ]
    }
]