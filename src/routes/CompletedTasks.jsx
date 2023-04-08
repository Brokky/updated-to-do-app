import React from 'react'
import useApp from '../AppContext'

function CompletedTasks() {

    const { completedTaskArray } = useApp();

    return (
        <div>
            <ul>
                {completedTaskArray.map(task => {
                    return (
                        <li key={task.key} id={`task${task.key}`}>
                            <span>{task.text}</span>
                            <p>Completed: {task.date}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CompletedTasks