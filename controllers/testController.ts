import TestService from "../services/testService.ts";
import * as log from "https://deno.land/std/log/mod.ts";

await new Promise((resolve) => setTimeout(resolve, 0));


export default {
    /**
     * @description Get all Employee List
     */
    connectionPool: async (ctx: any) => {
        try {
            // let kw = request.url.searchParams.get('page_number');
            // console.log("bayo", kw)
            const data = await TestService.connectionPool();
            ctx.response.status = 200;
            ctx.response.body = data;
        }
        catch (error) {
            ctx.response.status = 400;
            ctx.response.body = {
                success: false,
                message: `Error: ${error}`,
            };
        }
    },
};