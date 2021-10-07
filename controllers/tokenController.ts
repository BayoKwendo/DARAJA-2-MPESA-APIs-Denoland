import { MPESA } from '../config/config.ts'; // static  keys defined here

export default {
	/**
	   * @description mpesa access token
	   */
	tokenController: async (response: any) => {
		try {
			// get a base64 encoded string
			const buf = btoa(`${MPESA.b2c_consumer_api}:${MPESA.b2c_secret}`);
			// authentication string
			// deno-lint-ignore prefer-const
			let auth = `Basic ${buf}`;
			// send a GET request to the URL
			const postRequest = await fetch(`${MPESA.url_token}`, {
				method: 'GET',
				headers: {
					Authorization: `${auth}`,
					Accept: '*/*',
				},
			});
			if (postRequest) {
				const data = await postRequest.json();
				console.log(data.access_token); // token
				/**
				* @description HERE IS YOUR ACCESS TOKEN!!!!
				*/
			}
			// get the access token from server response
		} catch (error) {
			response.status = 400;
			response.body = {
				status: false,
				message: `${error}`,
			};
		}
	},
};
