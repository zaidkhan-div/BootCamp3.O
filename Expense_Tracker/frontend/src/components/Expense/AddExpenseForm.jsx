import React, { useState } from 'react'
import EmojiPickerPopup from "../layout/EmojiPickerPopup"
import Input from '../Input/Input'

const AddExpenseForm = ({ onAddExpense }) => {
    const [income, setIncome] = useState({
        category: "",
        amount: "",
        date: "",
        icon: ""
    })

    const handleChange = (key, value) => setIncome({ ...income, [key]: value })

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={income.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Category"
                placeholder="Rent, Groceries, etx"
                type="text"
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="Rent, Groceries, etx"
                type="number"
            />

            <Input
                value={income?.date}
                onChange={(target) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />
            <div className="flex justify-end mt-6">
                <button type='button' onClick={() => onAddExpense(income)} className='add-btn add-btn-fill'>
                    Add Expense
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm