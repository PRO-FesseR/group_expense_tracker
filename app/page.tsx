'use client'
import {createClient} from "@/utils/supabase/client";
import { useState} from "react";
import {redirect} from "next/navigation";


export  default function LoginPage() {
    const supabase = createClient();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    async function login() {

        const data = {
            email: email,
            password: password,
        }

        const { error } = await supabase.auth.signInWithPassword(data)
        console.log(data)
        if (error) {
            setError(error.message)
        }
        else {
            redirect('/dashboard')
        }
    }

    async function signUp(){

        const data = {
            email: email,
            password: password,
        }

        const { error } = await supabase.auth.signUp(data)

        if (error) {
            setError(error.message)
        }
        else {
            redirect('/dashboard')
        }


    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form className="flex flex-col gap-6 bg-black rounded-lg text-white p-10">


                    <h1 className="w-full text-center text-4xl ">Login</h1>
                    <div className="w-full text-red-500 text-center">{error}</div>
                    <div className="flex justify-end gap-4">
                        <label htmlFor="email">Email:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)
                        } id="email" name="email" type="email" required/>
                    </div>
                    <div className="flex justify-end gap-4">
                        <label htmlFor="password">Password:</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password"
                               type="password"
                               required/>
                    </div>




            <div className="flex justify-end gap-4 mt-5">
                <button className="bg-green-600! text-white! " type="button" onClick={login}>Log in</button>
                <button className="bg-indigo-500! text-white! " type="button" onClick={signUp}>Sign up</button>
            </div>
                </form>

        </div>
    )
}