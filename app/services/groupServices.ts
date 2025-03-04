// services/groupService.ts

// Create group
export const createGroup = async (name: string) => {
    const res = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });

    if (!res.ok) {
        throw new Error('Failed to create group');
    }

    return res.json();
}

// Get expenses for a group
export const getExpenses = async (groupId?: string | Array<string>) => {
    const res = await fetch(`/api/groups/expenses/${groupId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch expenses');
    }
    console.log(res);
    return res.json();
}

// Add expense to a group
export const addExpense = async (groupId: string | Array<string> | undefined, expense: {
    description: string;
    amount: string
}) => {
    const res = await fetch(`/api/groups/expenses/${groupId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense)
    });

    if (!res.ok) {
        throw new Error('Failed to add expense');
    }

    return res.json();
}