const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	APP_CODE: `'${process.env.APP_CODE}'`,
	APP_NAME: `'"${process.env.APP_NAME}"'`,
	PRODUCTS_URL: `'${process.env.PRODUCTS_URL}'`,
	ACL_URL: `'${process.env.ACL_URL}'`,
	STORAGE_USER_KEY: '"ecommerce"',
	S3_IMAGES_URL: "'//s3.amazonaws.com/apprunn-acl/icons'",
	COMPANY_LOGIN_TITLE: `'${process.env.COMPANY_LOGIN_TITLE}'`,
	SALES_URL: `'${process.env.SALES_URL}'`,
});
