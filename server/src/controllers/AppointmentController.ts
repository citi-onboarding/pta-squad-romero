import { Request, Response } from "express";
import { Citi, Crud } from "../global"; 
import { Prisma, appointmentTypes } from '@prisma/client';

// Define o tipo de entrada que o Prisma espera para a criação
type AppointmentCreateInput = Prisma.AppointmentCreateInput;

// Tipagem para os dados de Appointment
interface AppointmentBody {
  appointmentType: appointmentTypes;
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string;
  problemDescription: string;
  petId: number; 
}

class AppointmentController implements Crud {
  // Inicializa o serviço Citi com o nome do modelo no Prisma: "Appointment"
  constructor(private readonly citi = new Citi("Appointment")) {}

  /**
   * POST /appointments
   * Cria um novo agendamento.
   */
  create = async (request: Request, response: Response): Promise<Response> => {
    // Campos extraídos do body, usando os nomes do modelo Prisma
    const { 
      appointmentType, 
      appointmentDate, 
      appointmentTime, 
      doctorName, 
      problemDescription, 
      petId 
    } = request.body as AppointmentBody;

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
    const newAppointment: AppointmentCreateInput = { 
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

  /**
   * GET /appointments
   * Lista todos os agendamentos.
   */
  get = async (request: Request, response: Response): Promise<Response> => {
    // Obtém todos os valores via Citi
    const { httpStatus, values } = await this.citi.getAll();

    return response.status(httpStatus).send(values);
  };
  
  /**
   * GET /appointments/:id
   * Busca um agendamento específico por ID.
   */
  show = async (request: Request, response: Response): Promise<Response> => {
      const { id } = request.params;
      
      // Busca pelo ID via Citi
      const { httpStatus, value } = await this.citi.findById(id);

      // Se encontrado, retorna 200 e o valor. Se não, Citi já trata o status.
      return response.status(httpStatus).send(value);
  }

  /**
   * DELETE /appointments/:id
   * Remove um agendamento.
   */
  delete = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    
    // Deleta o valor via Citi
    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };

  /**
   * PUT /appointments/:id
   * Atualiza os dados de um agendamento existente.
   */
  update = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    // Valores a serem atualizados 
    const { appointmentType, appointmentDate, appointmentTime, doctorName, problemDescription, petId } = request.body;

    const updated = { appointmentType, appointmentDate, appointmentTime, doctorName, problemDescription, petId };
    const { httpStatus, messageFromUpdate } = await this.citi.updateValue( id, updated );

    return response.status(httpStatus).send({ messageFromUpdate });
  };
}

export default new AppointmentController();