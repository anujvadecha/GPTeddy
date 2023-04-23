import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const AnalyticsComponent = () => {

    // Generate data for Sentimental Analysis chart
    const sentimentData = [];
    for (let i = 0; i < 30; i++) {
        sentimentData.push({
            name: `Day ${i + 1}`,
            value: (Math.random() * 2) - 1 // Generate random number between -1 and 1
        });
    }

    // Generate data for Comprehension pie chart
    const comprehensionData = [
        { name: 'Math', value: Math.floor(Math.random() * 100) },
        { name: 'Geography', value: Math.floor(Math.random() * 100) },
        { name: 'History', value: Math.floor(Math.random() * 100) },
        { name: 'English', value: Math.floor(Math.random() * 100) },
        { name: 'Science', value: Math.floor(Math.random() * 100) }
    ];

    // Generate data for Confidence line chart
    const confidenceData = [];
    for (let i = 0; i < 30; i++) {
        confidenceData.push({
            name: `Day ${i + 1}`,
            value: Math.floor(Math.random() * 100)
        });
    }

    // Set colors for pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <>
            <h1 className='pb-3 mt-5 text-4xl font-bold text-center bold'>Analytics</h1>

            <div className='w-full pb-3 mt-5 border-t border-gray-400'></div>
            <div className='justify-center mx-3'>
                <h2>Sentimental Analysis</h2>
                <LineChart width={400} height={250} data={sentimentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>

                <h2>Comprehension</h2>
                <PieChart width={500} height={300}>
                    <Pie
                        data={comprehensionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {
                            comprehensionData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip />
                </PieChart>

                <h2 className='justify-center mx-3'>Confidence</h2>
                <LineChart width={400} height={250} data={confidenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        </>

    );
};

export default AnalyticsComponent;
