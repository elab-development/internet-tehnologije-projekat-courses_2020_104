import React from 'react'
import { useCourseStatistics, useLabelStatistics } from '../../hooks/apiHooks'
import BarDiagram from '../../components/BarDiagram';

export default function AdminStatisticsPage() {
    const courseStatistics = useCourseStatistics();
    const labelStatistics = useLabelStatistics();
    return (
        <div className='px-5'>
            <h3 className='text-center m-2'>Label Statistics</h3>
            <BarDiagram data={labelStatistics} fill='#8884d8' />
            <h3 className='text-center m-2'>Course Statistics</h3>
            <BarDiagram data={courseStatistics} fill='#8884d8' />
        </div>
    )
}
