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
            <div>
                <h1>Cadastro</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div> 
                        <input type="" />
                        <input type="" />
                    </div>
                    <div> {/* selection of species */}

                    </div>
                    <div>
                        <input />
                        <input />
                    </div>

                    <div>
                        <input />
                        <input />
                        <input />
                    </div>

                    <div>
                        <textarea />
                    </div>

                    <RegisterModal />
                </form>
            </div>
        </>
    )
}