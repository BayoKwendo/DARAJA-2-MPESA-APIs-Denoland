import { MPESA } from '../config/config.ts';

export default {
	/**
	   * @description business to client transaction
	   */
	b2cController: async ({ request, response }: { request: any, response: any }) => {
		try {
			const body = await request.body();
			const values = await body.value;
			// post request to mpesa b2c api
			const postB2C = await fetch(`${MPESA.b2c_url}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer token`,
				},
				// body params to be passed
				body: JSON.stringify({
					InitiatorName: ` `, // pre-defined in the config files. initiator name
					SecurityCredential: `${MPESA.securityCredential}`, // Secruity Credential generated
					Occassion: 'StallOwner', // Occassion
					CommandID: 'BusinessPayment', // command ID
					PartyA: ``, // shortcode
					PartyB: '', // phone number
					Remarks: '', // remarts
					Amount: '', // amount
					QueueTimeOutURL: '', // time out response to be send here
					ResultURL: '', // result to be send here
				}),
			});
			if (postB2C) {
				// handle response type
				const data_response = await postB2C.json();
				console.log(postB2C);
				response.body = {
					status: true,
					status_code: 200,
					data: data_response,
					message: 'Success!',
				};
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
