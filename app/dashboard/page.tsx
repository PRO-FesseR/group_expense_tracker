'use client'
import {redirect} from 'next/navigation'

import { createClient } from '@/utils/supabase/client'
import { FormEvent, useEffect, useState} from "react";
import {User} from "@supabase/auth-js";
import {createGroup} from "@/app/services/groupServices";
import Link from "next/link";

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
    const [newGroupName, setNewGroup] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        async function validateUser() {
            const {data, error} = await supabase.auth.getUser()
            if (error || !data?.user) {
                redirect('/');

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
                setLoading(false);
            }
        }
        getGroups()

    }, [user]);

    async function addGroup(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!newGroupName || !user) return

        try {
                const newGroup = await createGroup(newGroupName)
                setGroups([...groups, newGroup])
                setNewGroup('')
            setNewGroup('')
            }
         catch (error) {
            console.error('Error creating group:', error)
        }
    }

    async function handleSignOut(){
        const { error} = await supabase.auth.signOut();
        if(!error){
            redirect('/')
        }

    }


    return (
        <>
                {loading ?<div>Loading..</div>:
                    <div className="flex flex-col  w-full items-center h-screen gap-5 ">
                        <div className="flex w-full justify-between items-center bg-black text-white p-6">
                            <div className="flex flex-col">
                            <h1 className="text-2xl">Email: {user && user.email}</h1>
                                <button onClick={handleSignOut} className="bg-red-600! text-white! pt-2!">Logout</button>
                            </div>
                            <form className="flex gap-3 items-center" onSubmit={(e) => addGroup(e)}>
                                <label>Group Name:</label>
                                <input type="text" onChange={(e) => setNewGroup(e.target.value)}/>
                                <button className="p-2! bg-green-700! text-white! w-[180px]! text-[14px]  "
                                        type="submit">Add Group
                                </button>

                            </form>
                        </div>
                        <h2 className="text-2xl">Groups</h2>
                        <div className="flex flex-column gap-3">

                            {groups.length > 0 ? groups.map((group) => {
                                    return <Link
                                        className="bg-gray-200 p-5 rounded-2xl hover:bg-black hover:text-white transition-all ease-in"
                                        href={`/groups/${group.id}`} key={group.id}>{group.name}</Link>
                                })
                                :
                                <div>No groups available!</div>
                            }
                        </div>
                    </div>
                }
        </>
    )

}