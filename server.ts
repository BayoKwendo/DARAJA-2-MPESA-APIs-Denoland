
import { Application, HttpServerNative } from "https://deno.land/x/oak/mod.ts";  //oak server 
import { green, yellow } from "https://deno.land/std/fmt/colors.ts"; // beautifying my port
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import mpesaRouter from "./routes/mpesa.route.ts"; // link to our router
import logger from './middlewares/logger.ts'; // logs middleWare
import notFound from './middlewares/notFound.ts'; // not found page

const app = new Application({
  serverConstructor: HttpServerNative
}); // initialize out oak server

const port = 2000;  // custome port

app.use(
  oakCors({
    origin: "*",
    maxAge: 8640033
  }),
);  // enable cors

app.use(logger.logger); //include logger middleware
app.use(logger.responseTime)

app.use(mpesaRouter.routes());  //redirect ot the controller
app.use(mpesaRouter.allowedMethods());

// 404 page
app.use(notFound);
app.addEventListener("error", (evt) => {
  console.log(evt.error);
});
app.use((ctx) => {
  ctx.throw(500);
});


app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow("Listening on:")} ${green(url)}`,);
});
await app.listen({ port });
