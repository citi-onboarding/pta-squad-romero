import express from "express";
import userController from "./controllers/UserController";
import petController from "./controllers/PetController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

// Pet routes
routes.post("/pet", petController.create);
routes.get("/pet", petController.get);
routes.get("/pet/:id", petController.findPetId);
routes.delete("/pet", petController.delete);
routes.patch("/pet", petController.uptade);

export default routes;
