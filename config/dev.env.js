const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	APP_CODE: `'${process.env.APP_CODE}'`,
	APP_NAME: `'"${process.env.APP_NAME}"'`,
	PRODUCTS_URL: `'${process.env.PRODUCTS_URL}'`,
	ACL_URL: `'${process.env.ACL_URL}'`,
	STORAGE_USER_KEY: '"ecommerce"',
	S3_IMAGES_URL: "'//apprunn.s3.amazonaws.com'",
	COMPANY_LOGIN_TITLE: `'${process.env.COMPANY_LOGIN_TITLE}'`,
	COMPANY_LOGO: `'${process.env.COMPANY_LOGO}'`,
	SALES_URL: `'${process.env.SALES_URL}'`,
	FORM_BACKGROUND: `'${process.env.FORM_BACKGROUND}'`,
	COLOR_BASE: `'${process.env.COLOR_BASE}'`,
	COLOR_LINK: `'${process.env.COLOR_LINK}'`,
	COLOR_BORDER: `'${process.env.COLOR_BORDER}'`,
	COLOR_HIGHLIGHT: `'${process.env.COLOR_HIGHLIGHT}'`,
});
