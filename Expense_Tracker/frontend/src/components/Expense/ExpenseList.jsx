import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TrasnactionInfoCard from '../Cards/TrasnactionInfoCard'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
    return (
        <div className='card'>
            <div className="flex items-center justify-between">
                <h5 className="text-lg">All Expense</h5>
                <button className='card-btn' onClick={onDownload}><LuDownload className='text-base' /> Download</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {
                    transactions?.map((expense) => {
                        <TrasnactionInfoCard
                            key={expense?._id}
                            title={expense?.category}
                            icon={expense.icon}
                            date={moment(expense.date).format("DO MM YYYY")}
                            amount={expense.amount}
                            type="expense"
                            onDelete={() => onDelete(expense._id)}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default ExpenseList
