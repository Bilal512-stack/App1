import React, { createContext, useState } from 'react';

type OrderDataType = {
    senderName?: string;
    senderAddress?: string;
    phoneSender?: string;
    recipientName?: string;
    recipientAddress?: string;
    recipientPhone?: string;
    weight?: number;
    nature?: string;
    truckType?: string;
};

type CreateOrderContextType = {
    orderData: OrderDataType;
    updateOrderData: (newData: Partial<OrderDataType>) => void;
};

export const CreateOrderContext = createContext<CreateOrderContextType | null>(null);

export const CreateOrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [orderData, setOrderData] = useState<OrderDataType>({});

    const updateOrderData = (newData: Partial<OrderDataType>) => {
        setOrderData((prevData) => ({
            ...prevData,
            ...newData,
        }));
        console.log('Données après mise à jour :', orderData);
    };

    return (
        <CreateOrderContext.Provider value={{ orderData, updateOrderData }}>
            {children}
        </CreateOrderContext.Provider>
    );
};