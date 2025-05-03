interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

interface IShop {
    cardsList: HTMLElement[];
}

interface IBasket {
    itemsList: HTMLElement[];
    itemsTotal: number;
}

interface IPayment {
    value: string;
}
