
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = await createClient()

    // Check user authentication
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request body
    const { name } = await request.json()

    if (!name) {
        return NextResponse.json({ error: 'Group name required' }, { status: 400 })
    }

    // Insert new group
    const { data, error } = await supabase
        .from('groups')
        .insert({ name, created_by: user.id })
        .select()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
}