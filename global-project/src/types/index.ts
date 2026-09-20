// This file exports TypeScript interfaces and types used across the application to ensure type safety.

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
}

export type Response<T> = {
    success: boolean;
    data?: T;
    error?: string;
};