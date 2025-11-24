import express from "express";
import userController from "./controllers/UserController";
import petController from "./controllers/PetController";
import PetController from "./controllers/PetController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

// Pet routes
routes.post("/pet", PetController.create);
routes.get("/pet", PetController.get);
routes.get("/pet", PetController.findPetId);
routes.delete("/pet", PetController.delete);
routes.patch("/pet", PetController.uptade);

export default routes;
