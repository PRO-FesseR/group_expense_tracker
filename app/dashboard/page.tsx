'use client'
import {redirect} from 'next/navigation'

import { createClient } from '@/utils/supabase/client'
import { FormEvent, useEffect, useState} from "react";
import {User} from "@supabase/auth-js";

type group={
    created_at?:string
    created_by?:string
    id:string
    name:string
}

export default function PrivatePage() {
    const [user, setUser] = useState<User | null>(null)
    const supabase = createClient();
    const [groups, setGroups] = useState<Array<group> | []>([]);
    const [newGroup, setNewGroup] = useState<string>();

    useEffect(() => {
        async function validateUser() {
            const {data, error} = await supabase.auth.getUser()
            console.log(data)
            if (error || !data?.user) {
                redirect('/login')
            } else {
                setUser(() => data?.user)
            }

        }

        validateUser()
    }, []);

    useEffect(() => {
        async function getGroups() {
            if (user) {
                const {data} = await supabase.from("groups").select("*").eq('created_by', user.id);

                setGroups(data || [])
            }
        }

        getGroups();

    }, [user]);

    async function addGroup(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!newGroup || !user) return

        try {
            const response = await fetch('/api/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newGroup }),
            })

            if (response.ok) {
                const newGroupData = await response.json()
                setGroups([...groups, newGroupData])
                setNewGroup('')
            }
        } catch (error) {
            console.error('Error creating group:', error)
        }
    }

    return (
        <>
        <h1>Hello {user ? user.email : 'unauthorized'}</h1>
            <form onSubmit={(e)=>addGroup(e)}>
                <label>Group Name:</label>
                <input type="text" onChange={(e)=>setNewGroup(e.target.value)}/>
                {newGroup && <button type="submit">submit</button>}
            </form>
        <div>
            {groups.length > 0 && groups.map((group)=>{
                return <a key={group.id}>{group.name}</a>
            })}
        </div>
        </>
    )

}