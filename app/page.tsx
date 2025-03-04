'use client'
import {  signup } from './actions'
import {createClient} from "@/utils/supabase/client";
import {useState} from "react";
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


        redirect('/dashboard')
    }
    return (
        <form >
            <label htmlFor="email">Email:</label>
            <input onChange={(e)=> setEmail(e.target.value)
            } id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input onChange={(e)=> setPassword(e.target.value)} id="password" name="password" type="password" required />
            <button type="button" onClick={login}>Log in</button>
            <button formAction={signup}>Sign up</button>
            <div>{error}</div>
        </form>
    )
}