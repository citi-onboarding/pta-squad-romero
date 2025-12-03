import { Request, Response } from "express";
import { Citi, Crud } from "../global"; 
import { Prisma, appointmentTypes } from '@prisma/client';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AppointmentController implements Crud {
  constructor(private readonly citi = new Citi("Appointment")) {}

    // POST /appointments
    // Cria um novo agendamento
  create = async (request: Request, response: Response): Promise<Response> => {
    const { 
      appointmentType, 
      appointmentDate, 
      appointmentTime, 
      doctorName, 
      problemDescription, 
      petId 
    } = request.body;

    // Validação usando o Citi para campos obrigatórios
    const isAnyUndefined = this.citi.areValuesUndefined(
      appointmentType,
      appointmentDate,
      appointmentTime,
      doctorName,
      problemDescription,
      petId?.toString() // Converte para string para usar o método areValuesUndefined
    );
    
    // Retorna 400 se algum dado obrigatório estiver faltando
    if (isAnyUndefined) {
        return response.status(400).send();
    }

    // Objeto a ser inserido no banco de dados (deve coincidir com o modelo Prisma)
    const newAppointment = { 
        appointmentType, 
        appointmentDate, 
        appointmentTime, 
        doctorName, 
        problemDescription, 
        // Tratamento da Chave Estrangeira (relação com Pet)
        pet: { connect: { id: petId } }
    };

    // Insere no banco via Citi
    const { httpStatus, message } = await this.citi.insertIntoDatabase(newAppointment);
    // Mensagem de sucesso ou erro 
    return response.status(httpStatus).send({ message });
  };

  // GET /appointments
  get = async (request: Request, response: Response): Promise<Response> => {
    try {
      const appointments = await prisma.appointment.findMany({
        include: {
          pet: true // include pet too
        }
      });

      return response.status(200).send(appointments);
    } catch (error) {
      return response.status(500).send({ message: "Erro ao buscar agendamentos."});
    }

  };
  
  // GET /appointments/:id
  // Obtém um agendamento pelo ID
  getById = async (request: Request, response: Response): Promise<Response> => {
      const { id } = request.params;
      
      // Busca pelo ID via Citi
      const { httpStatus, value } = await this.citi.findById(id);

      // Se encontrado, retorna 200 e o valor. Se não, Citi já trata o status.
      return response.status(httpStatus).send(value);
  }

  // DELETE /appointments/:id
  delete = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    
    // Deleta o valor via Citi
    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };

  // PUT /appointments/:id
  // Atualiza um agendamento pelo ID
  update = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    // Valores a serem atualizados 
    const { appointmentType, appointmentDate, appointmentTime, doctorName, problemDescription, petId } = request.body;

    const updated = { appointmentType, appointmentDate, appointmentTime, doctorName, problemDescription, petId };
    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(id, updated);

    return response.status(httpStatus).send({ messageFromUpdate });
  };
}

export default new AppointmentController();