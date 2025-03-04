'use client'

import {redirect, useParams} from "next/navigation";
import {FormEvent, useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";
import {addExpense, createGroup, getExpenses} from "@/app/services/groupServices";
import Link from "next/link";

export default function group(){
    const { groupId } = useParams();
    const [expenses, setExpense] = useState<Array<any>>([])
    const [error, setError] = useState<string>('')
    const supabase = createClient();
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false)
    const [groupName, setGroupName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function validateUser() {
            const {data, error} = await supabase.auth.getUser()
            console.log(data)
            if (error || !data?.user) {
                redirect('/')
            }
        }
        async function getGroupExpenses(){
            try{
                const data = await getExpenses(groupId);
                console.log(data);
                setGroupName(data.name);
                setLoading(false)
                setExpense(data.expenses);
            }catch (error){
                // @ts-ignore
                setError(error?.message);
                console.error('Error creating group:', error)
            }
        }
        validateUser().then(()=> getGroupExpenses())
    }, []);
    async function addNewExpense(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (!description || !amount) {
            return
        }
        try {
            const newExpense = await addExpense(groupId, {description, amount});
            setExpense([...expenses, newExpense])
            setShowForm(false);
            setDescription('');
            setAmount('');
        }
        catch (error) {
            console.error('Error creating group:', error)
        }
    }

    return(<>
            {!loading?
                <div className="flex flex-col w-full gap-5 items-center">
                <div className="flex  w-full bg-black text-white justify-between items-center gap-5 px-10">
                    <h1 className="text-4xl py-10">{groupName}</h1>
                    <div className="w-[300px] flex items-center justify-between">
                        <Link className="text-white " href="/dashboard" >Go back</Link>
                        <button className="p-2! bg-green-700! text-white! w-[180px]! text-[14px] " onClick={()=>setShowForm(!showForm)}>Add Expense</button>
                        {showForm &&
                            <div  className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
                            <form className=" bg-black flex flex-col p-10 gap-7 items-end" onSubmit={addNewExpense}>
                            <div className="flex flex-col w-full gap-3">
                            <label>Description:</label>
                            <textarea style={{
                                resize:'vertical',
                            }} onChange={(e)=>setDescription(e.target.value)} value={description}/>
                            </div>
                                <div className="flex gap-2">
                                    <label>Amount:</label>
                                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                                    </div>
                                        <button className="p-2! bg-green-700! text-white! w-[180px]! text-[14px]  " type="submit">Submit</button>
                            </form>
                            </div>}
                    </div>
                </div>
                <div>{error}</div>
                    <div className="flex flex-col w-[80%]">
                        <div  className="flex gap-20 bg-black items-center justify-between">
                            <div className="px-2  text-white">Description</div>
                            <div className=" px-2 text-white ">Amount</div>
                        </div>
            {expenses?.length > 0 ? expenses.map((expense, index) => {
                return <div key={expense.id} className="flex gap-20 bg-gray-200 items-center justify-between">
                    <div className="px-2 py-2">{expense.description}</div>
                    <div className=" px-2 py-2 bg-gray-100 h-full w-[120px] text-right">{expense.amount}</div>
                </div>})
            :
                <div className="text-center mt-[3px]">No expenses recorded!</div>
}
            </div>
                </div>
            :
            <div>Loading..</div>


            }



        </>
    )
}