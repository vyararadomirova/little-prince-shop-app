export interface Product {
    id: string;
    _ownerId?: string;
    name: string;
    description: string;
    content: string;
    price: string;
    imageUrl: string;
    isTop: boolean;
}