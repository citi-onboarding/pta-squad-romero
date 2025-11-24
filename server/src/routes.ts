import express from "express";
import userController from "./controllers/UserController";
import appointmentController from "./controllers/AppointmentController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/appointments", appointmentController.create);
routes.get("/appointments", appointmentController.get);
routes.get("/appointments/:id", appointmentController.getById);
routes.delete("/appointments/:id", appointmentController.delete);
routes.put("/appointments/:id", appointmentController.update);

export default routes;
