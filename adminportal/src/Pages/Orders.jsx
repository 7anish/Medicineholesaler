import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';

function Orders() {
    const orders = [
        {
            id: 1,
            products: [
                { name: 'Product 1', quantity: 2 },
                { name: 'Product 2', quantity: 1 },
            ],
            status: 'completed',
        },
        {
            id: 2,
            products: [
                { name: 'Product 3', quantity: 1 },
                { name: 'Product 4', quantity: 3 },
            ],
            status: 'pending',
        },
        {
            id: 3,
            products: [
                { name: 'Product 5', quantity: 4 },
            ],
            status: 'cancelled',
        },
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'completed':
                return 'text-green-500';
            case 'pending':
                return 'text-blue-500';
            case 'cancelled':
                return 'text-red-500';
            default:
                return '';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle />;
            case 'pending':
                return <FaSpinner />;
            case 'cancelled':
                return <FaTimesCircle />;
            default:
                return null;
        }
    };

    return (
        <div className="absolute w-[80vw] right-0 p-4">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-4 shadow rounded">
                        <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
                        <ul className="mb-2">
                            {order.products.map((product, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{product.name}</span>
                                    <span>x{product.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <div className={`flex items-center ${getStatusStyles(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-2 capitalize">{order.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders