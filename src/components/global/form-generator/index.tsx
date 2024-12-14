import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import {  FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import {ErrorMessage} from '@hookform/error-message'
type Props = {
    type?: 'text' | 'email' | 'password' | 'number'
    inputType: 'select' | 'input' | 'textarea'
    options?: {value: string; label: string; id: string}[]
    label?: string
    placeholder: string
    register: UseFormRegister<any>
    name: string
    errors: FieldErrors<FieldValues>
    lines?:number
}

const FormGenerator = (
    {
        inputType,
        options,
        label,
        placeholder,
        register,
        name,
        errors,
        type,
        lines
    }: Props) => {
        switch(inputType){
            case "input":
                return(
                    <Label
                     className="flex flex-col gap-2 text-[#9D9D9D]"
                     htmlFor={`input-${label}`}
                    >
                        {label && label}
                        <Input
                            id={`input-${label}`}
                            type={type}
                            placeholder={placeholder}
                            className="bg-trnasparent border-themeGray text-themeTextGray"
                            {...register(name)}
                        />
                        <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({message})=>(
                                <p className='text-red-400 mt-2'>
                                    {message === "Required"? '': message}
                                </p>
                            )}
                        />
                    </Label>
                )
        }


  return (
    <div>FormGenerator</div>
  )
}

export default FormGenerator