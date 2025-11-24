import { Request, Response } from "express";
import { Citi, Crud } from "../global"; 
import { Prisma, appointmentTypes } from '@prisma/client';

// Define o tipo de entrada exato que o Prisma espera para a criação
type AppointmentCreateInput = Prisma.AppointmentCreateInput;

// Tipagem para os dados de Appointment (body da requisição)
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
    // Campos extraídos do body, usando os nomes EXATOS do modelo Prisma
    const { 
      appointmentType, 
      appointmentDate, 
      appointmentTime, 
      doctorName, 
      problemDescription, 
      petId 
    } = request.body as AppointmentBody;

    // Validação usando o utilitário Citi para campos obrigatórios
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
    const newAppointment: AppointmentCreateInput ={ 
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

    return response.status(httpStatus).send({ message });
  };

  /**
   * GET /appointments
   * Lista todos os agendamentos. (FindAll)
   */
  get = async (request: Request, response: Response): Promise<Response> => {
    // Obtém todos os valores via Citi
    const { httpStatus, values } = await this.citi.getAll();

    return response.status(httpStatus).send(values);
  };
  
  /**
   * GET /appointments/:id
   * Busca um agendamento específico por ID. (FindAppointmentById / show)
   * Nota: O método `Citi.findById` espera o ID no formato que o Prisma usa (número).
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
    const updates = request.body; // Valores a serem atualizados (parcialmente)

    // Atualiza o valor via Citi
    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
      id,
      updates
    );

    return response.status(httpStatus).send({ messageFromUpdate });
  };
}

export default new AppointmentController();