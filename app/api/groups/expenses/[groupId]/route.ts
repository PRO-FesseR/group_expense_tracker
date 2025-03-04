import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params:  Promise<{groupId: string}>  }) {
    const {groupId} = await params;

    const supabase = await createClient();

    // Check user authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let { data:expenses, error:expenseError } = await supabase
        .from("expenses")
        .select("*")
        .eq("group_id", groupId);



    let { data:group,error:groupError } = await supabase
        .from("groups")
        .select("*")
        .eq("id", groupId);
    if (expenseError ) {
        return NextResponse.json({ error: expenseError.message }, { status: 500 });
    }
    else if (groupError){
        return NextResponse.json({ error: groupError.message }, { status: 500 });
    }
    let name;
    if(group){
        name = group[0].name;
        }
    return NextResponse.json({expenses, name});
}


export async function POST(request: Request, { params }: { params:  Promise<{groupId: string}>  }) {
    const {groupId} = await params;

    const supabase = await createClient();

    // Check user authentication
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { description, amount } = await request.json()
    const { data, error } = await supabase
        .from('expenses')
        .insert({ description,amount, user_id: user.id, group_id: groupId })
        .select()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
}