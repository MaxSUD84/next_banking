'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { z } from "zod"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input" 
import { ITEMS } from '@/constants'
import CustomInput from './CustomInput' 
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'

const AuthForm = ({ type }: AuthFormProps) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = authFormSchema(type)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    
    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            // Sign up with Appwire & create plaid token authorization
            const userData = {
                firstName: data.firstName!,
                lastName: data.lastName!,
                address1: data.address1!,
                city: data.city!,
                state: data.state!,
                postalCode: data.postalCode!,
                dateOfBirth: data.dateOfBirth!,
                ssn: data.ssn!,
                email: data.email,
                password: data.password
            }

            if(type === 'sign-up') {
                const newUser = await signUp(userData)

                setUser(newUser)
            }

            if(type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                })

                // console.log('onSubmit action: ', response)

                if(response) router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <section className="auth-form">
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className='flex cursor-pointer items-center gap-1'>
                <Image 
                    src="/icons/logo.svg"
                    width={34}
                    height={34} 
                    alt={'Horizon logo'}
                />
                <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
            </Link>

            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className='text-24 jg:text-36 font-semibold text-gray-900'>
                    {user 
                        ? 'Аккаунт создан'
                        : type === 'sign-in'
                            ? 'Войти'
                            : 'Зарегистрироваться'
                    }
                    <p className="text-16 font-normal text-grey-600">
                        { user
                            ? 'Войдите в вашу учетную запись чтобы начать'
                            : 'Заполните данные о себе'
                        }
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className="flex flex-col gap-4">
                <PlaidLink user={user} variant='primary'/>
            </div>
        ) : (
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {type === 'sign-up' && (
                        <>
                            <div className="flex gap-4">
                                <CustomInput 
                                    control={form.control}
                                    name='firstName'
                                    label='Имя'
                                    placeholder='Иван'
                                />
                                <CustomInput 
                                    control={form.control}
                                    name='lastName'
                                    label='Фамилия'
                                    placeholder='Иванов'
                                /> 
                            </div>
                           
                            <CustomInput 
                                control={form.control}
                                name='address1'
                                label='Адрес'
                                placeholder='Введите адрес регистрации'
                            />

                            <CustomInput 
                                control={form.control}
                                name='city'
                                label='Город'
                                placeholder='Введите ваш город'
                            />

                            <div className="flex gap-4">
                                <CustomInput 
                                    control={form.control}
                                    name='state'
                                    label='Область'
                                    placeholder='Московская'
                                />
                                <CustomInput 
                                    control={form.control}
                                    name='postalCode'
                                    label='Индеск'
                                    placeholder='XXXXXX'
                                />
                            </div>

                            <div className="flex gap-4">
                                <CustomInput 
                                    control={form.control}
                                    name='dateOfBirth'
                                    label='Дата рождения'
                                    placeholder='DD.MM.YYYY'
                                />
                                <CustomInput 
                                    control={form.control}
                                    name='ssn'
                                    label='СНИЛС'
                                    placeholder='123-123-123-12'
                                />
                            </div>
                        </>
                    )}

                    <CustomInput 
                        control={form.control}
                        name='email'
                        label='Логин'
                        placeholder='Введите ваш логин'
                    />

                    <CustomInput 
                        control={form.control}
                        name='password'
                        label='Пароль'
                        placeholder='Введите ваш пароль'
                    />

                    <div className="flex flex-col gap-4">
                        <Button type="submit" className='form-btn' disabled={isLoading}>
                            { isLoading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin' /> &nbsp;
                                    Загружается ...
                                </>
                            ): type === 'sign-in'
                                    ? 'Войти'
                                    : 'Зарегистрироваться'
                            }
                        </Button>
                    </div>
                    </form>
                </Form>

                <footer className="flex justify-center gap-1">
                    <p className='text-14 font-normal text-gray-600'>
                        {type === 'sign-in'
                            ? "Нет аккаунта ?"
                            : "Ранее регистрировались ?"
                        }
                    </p>
                    <Link href={type === 'sign-in' ? '/sign-up': '/sign-in'} className='form-link'>
                        {type === 'sign-in' ? 'Зарегистрироваться': 'Войти'}
                    </Link>
                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm