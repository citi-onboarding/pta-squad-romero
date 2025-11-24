import { Request, Response } from "express";
import { Citi, Crud } from "../global";

class PetController implements Crud {
    constructor(private readonly citi = new Citi("Pet")) {} // Pet is the name of table
    // Create a new pet
    create = async (request: Request, response: Response) => {
        // Get data
        const {name, type, age, owner} = request.body; 
        // Validation
        const isAnyUndefined = this.citi.areValuesUndefined(
            name,
            type,
            age,
            owner
        );
        if (isAnyUndefined) return response.status(400).send(); // if undefined, error 400

        // Create pet
        const newPet = {name, type, age, owner};
        // Send to database
        const {httpStatus, message} = await this.citi.insertIntoDatabase(newPet);
        // Return the message
        return response.status(httpStatus).send({message});
    };

    // Get all the pets
    get = async (request: Request, response: Response) => {
        const {httpStatus, values} = await this.citi.getAll();

        return response.status(httpStatus).send(values);
    }

    // Get the pet by ID
    findPetId = async (request: Request, response: Response) => {
        const {id} = request.params // .params: get ID of url

        const {httpStatus, value} = await this.citi.findById(id);

        return response.status(httpStatus).send(value);
    }
    
    // Delete pet
    delete = async (request: Request, response: Response) => {
        const {id} = request.params;

        const {httpStatus, messageFromDelete} = await this.citi.deleteValue(id);

        return response.status(httpStatus).send({messageFromDelete});
    }

    // Uptade the data of pet
    uptade = async (request: Request, response: Response) => {
        const {id} = request.params;
        const {name, type, age, owner} = request.body;

        const updatedValues = {name, type, age, owner}; // created with updated values

        const {httpStatus, messageFromUpdate} = await this.citi.updateValue( // uptade pet
            id,
            updatedValues
        );

        return response.status(httpStatus).send({messageFromUpdate});
    };
}

export default new PetController();