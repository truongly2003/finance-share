import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BudgetPrediction = ({ userId, category, budget }) => {
    const [prediction, setPrediction] = useState(null);
    const [warning, setWarning] = useState(null);
    const [lastMonthAmount, setLastMonthAmount] = useState(0);

    useEffect(() => {
        const fetchPrediction = async () => {
            try {
                const response = await axios.post('http://localhost:8080/api/budget/predict', {
                    userId,
                    category,
                    budget
                });
                setPrediction(response.data.predicted_amount);
                setWarning(response.data.warning);

                // Giả lập số tiền tháng trước (thay bằng API thật)
                setLastMonthAmount(600000);
            } catch (error) {
                console.error('Error fetching prediction:', error);
            }
        };
        fetchPrediction();
    }, [userId, category, budget]);

    const chartData = {
        labels: ['Tháng trước', 'Tháng hiện tại'],
        datasets: [
            {
                label: 'Chi tiêu (VND)',
                data: [lastMonthAmount, prediction || 0],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dự đoán chi tiêu {category}</h2>
            {prediction && (
                <div>
                    <p>Dự đoán tháng này: {prediction.toLocaleString()} VND</p>
                    {warning && <p style={{ color: 'red' }}>{warning}</p>}
                    <Line data={chartData} options={{ responsive: true }} />
                </div>
            )}
        </div>
    );
};

export default BudgetPrediction;