import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import usersRouter from "./router/users.js";
import bookingsRouter from "./router/bookings.js";
import propertiesRouter from "./router/properties.js";
import reviewsRouter from "./router/reviews.js";
import hostsRouter from "./router/hosts.js";
import amenitiesRouter from "./router/amenities.js";
import loginRouter from "./router/login.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";


const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN, 
  integrations: [
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get("/", (req, res) => {
  res.send("Deze Website heet u van harte Welkom");
});

app.use(express.json());
app.use(log);

app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/hosts", hostsRouter);
app.use("/amenities", amenitiesRouter);

app.use("/login", loginRouter);

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
});
