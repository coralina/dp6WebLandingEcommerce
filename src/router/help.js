const route = {
	name: 'help-center',
	path: '/ayuda',
	component: () => import('@/pages/page-help-center'),
	children: [
		{
			name: 'help-base',
			path: 'apartado/:help',
			component: () => import('@/components/help/help-base'),
			children: [
				{
					name: 'help-content',
					path: 'seccion/:slug',
					component: () => import('@/components/help/help-content'),
				},
			],
		},
	],
};

export default route;
