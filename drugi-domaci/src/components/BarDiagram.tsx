import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


interface Props {
    data: any[],
    fill: string
}

export default function BarDiagram(props: Props) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={props.data}>
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='users' fill={props.fill} />
            </BarChart>

        </ResponsiveContainer>
    )
}
