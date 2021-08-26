export interface ILocation extends Location {
    from?: {
        key: string,
        pathname: string,
        search: string,
        hash: string
    },
    background?: {
        key: string,
        pathname: string,
        search: string,
        hash: string,
        state: unknown
    }
}

export interface IIngredient {
    _id: string,
    name: string,
    type: 'bun' | 'sauce' | 'main',
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}

export interface IOrder{
    ingredients: Array<string>;
    _id: string;
    status: 'created' | 'pending' | 'done';
    number: number;
    name: string;
    createdAt: string;
    updatedAt?: string;
}
