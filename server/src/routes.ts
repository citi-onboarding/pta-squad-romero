import express from "express";
import userController from "./controllers/UserController";
import appointmentController from "./controllers/AppointmentController";
import petController from "./controllers/PetController";


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

routes.post("/pet", petController.create);
routes.get("/pet", petController.get);
routes.get("/pet/:id", petController.findPetById);
routes.delete("/pet/:id", petController.delete);
routes.patch("/pet/:id", petController.update);


export default routes;
