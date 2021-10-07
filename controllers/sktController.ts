import { MPESA } from '../config/config.ts';
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";

export default {
	/**
   * @description stk push transaction
   */
	stkController: async ({ request, response }: { request: any, response: any }) => {
		try {
			const body = await request.body();
			const values = await body.value; // get values from post request. 

			let timestamp = moment(new Date()).format('YYYYMMDDHHmmss'); // timestamp generate

			console.log(timestamp) // log out the timestamp

			let passkey = ""; // passkey from mpesa

			let shortcode;
			// get a base64 encoded string
			const lipa_na_mpesa_password = btoa(`${shortcode}${passkey}${timestamp}`); //base64 encoded string

			console.log(lipa_na_mpesa_password)

			// post request to skt push api
			const postSTKPush = await fetch(`https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer `,  // token to be passed here
				},
				// body params to be passed
				body: JSON.stringify({
					BusinessShortCode: '', // shortcode
					Password: `${lipa_na_mpesa_password}`, //password generated
					Timestamp: `${timestamp}`, // timestampth
					TransactionType: 'CustomerPayBillOnline',
					Amount: `${values.amount}`, // amount
					Passkey: `${passkey}`, // passkey given from safarciom
					PartyA: '',
					PartyB: '', // shortcode
					PhoneNumber: `${values.msisdn}`, // phone number for initiation
					CallBackURL: '', //response to be sent
					AccountReference: '', // account reference anything
					TransactionDesc: '' // transaction Desc
				}),
			});
			if (postSTKPush) {
				// handle response type
				const data_response = await postSTKPush.json();
				console.log(postSTKPush);
				//output response
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
