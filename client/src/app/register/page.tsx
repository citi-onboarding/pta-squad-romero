'use client'
import React from 'react';
import Header from "@/components/header/header";
import { Input } from "@/components/ui/input";
import { Form, useForm } from "react-hook-form";
import { RegisterModal } from '@/components/modal/RegisterModal';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data : any) => {
        console.log(data);
    };

    return(
        <>
            <Header />
            <h1 className="font-bold text-5xl">Cadastro</h1>
            <div className="flex flex-col items-center">
                <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <div className="flex gap-6 w-full"> 
                        <div className="flex flex-col gap-3 w-full">
                            <p>Nome do Paciente</p>
                            <input className="p-4 rounded-[8px] border" type="text" placeholder=" Digite aqui..."/>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <p>Nome do Tutor</p>
                            <input className="p-4 rounded-[8px] border" type="text" placeholder="Digite aqui..."/>
                        </div>
                    </div>
                    <div  className="flex flex-col gap-3 w-full"> {/* selection of species */}
                        <p>Qual é a espécie do paciente?</p>
                        <div className="flex gap-[60px] w-full">
                            <input type="radio" name="especie" value="Ovelha"/>
                            <input type="radio" name="especie" value="Gato" />
                            <input type="radio" name="especie" value="Porco" />
                            <input type="radio" name="especie" value="Vaca" />
                            <input type="radio" name="especie" value="Cavalo" />
                            <input type="radio" name="especie" value="Cachorro" />
                        </div>
                    </div>
                    <div className="flex gap-7">
                        <div className="flex flex-col gap-3">
                            <p>Idade do Paciente</p>
                            <input className="p-4 rounded-[8px] border" type="text" placeholder="Digite aqui..."/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Tipo de consulta</p>
                            <select required className="p-4 rounded-[8px] border">
                                <option value="">-- Selecione aqui --</option>
                                <option value="Checkup">Check-up</option>
                                <option value="Retorno">Retorno</option>
                                <option value="PrimeiraConsulta">Primeira Consulta</option>
                                <option value="Vacinacao">Vacinação</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-7">
                        <div className="flex flex-col gap-3">
                            <p>Médico Responsável</p>
                            <input className="p-4 rounded-[8px] border" type="text" placeholder="Digite aqui..."/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Data do atendimento</p>
                            <input className="p-4 rounded-[8px] border" type="date"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Data do atendimento</p>
                            <input className="p-4 rounded-[8px] border" type="time" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <p>Descrição do Problema</p>
                        <textarea className="p-4 rounded-[8px] border w-full" />
                    </div>
                        <RegisterModal />
                    
                </form>
            </div>
        </>
    )
}