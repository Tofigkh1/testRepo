export interface PostDataType {
    id: number | string;
    name: string;
    description?: string;
    price: number;
    img_url: string;
    rest_id: string;
}

export interface ProductSingleApiResponse {
    result: {
        data: {
            id: string; // id kesinlikle string
            name: string; // name her zaman string
            category_id: string; // category_id string olmalı
            img_url: string | null; // img_url null olabilir
            cover_url: string | null; // cover_url de null olabilir
            description: string; // description her zaman string
            allDescription: string; // allDescription da her zaman string
            created: number; // created bir timestamp, bu yüzden number
            price: number; // price bir number
            rest_id?: string; // rest_id bazen boş string olabilir, bu yüzden optional olabilir
        };
    };
    status: number;
    message: string;
}



export interface BasketPostDataType {
    id?: string | number | any;
    basket_id?: string | number;
    user_id: string | number|undefined;
    product_id?: string | number;
    img_url?: string | null;
    price?: number;
    name?: string;
    count?: number;
    amount?: number;
    total_count?: number;
    total_item?: number;
    total_amount?: number;
    ageSize:string | number | null
}

user_id: user?.id,
product_id: productId,
ageSize: isRectVisible ? "1" : isRectVisible2 ? "2" : null,
 items?.img_url || "",  // Ürünün görseli URL'si
amount: items?.price || 1,        // Ürünün fiyatı
created: new Date().toISOString(), // Ürünün eklenme zamanı
count: items?.count || 1,

export interface OrderPostDataType{
    id: string | number;
    date: string | number;
    user_id: string | undefined;
    delivery_address: string | number;
    amount: number;
    created: string | number;
    contact: string | number;
    fullname: string;
    count?: number;
    payment_method: number | string;
    total_count?: number;
    total_item?: number;
    total_amount?: number;
    email: string;
    price: number;
    basket_id: string | number;
}

export interface CategoryApiResponse {
    result: {
        data: CategoryPostDataType[];
    };
    status: number;
    message: string;
}

export interface CategoryPostDataType {
    id: number | string | any;
    name: string;
    img_url: File | string | null;
    category: string
}

export interface ApiResponse {
    result: {
        data: PostDataType[];
    };
    status: number;
    message: string;
}





export interface ProductPostDataType{
    id?: string | number | any;
    cover_url: string | number | any
    img_url?:string|null;
    price?: number;
    name?: string;
    description?: string;
    created: string
    rest_id?: string;
    category_id: string;
    allDescription: string
}


export interface ProductApiResponse {
    result: {
        data: ProductPostDataType[];
    };
    status: number;
    message: string;
}

export interface BasketPostDataType {
    id?: string | number | any;
    basket_id?: string | number;
    user_id: string | number|undefined;
    product_id?: string | number;
    img_url?: string | null;
    price?: number;
    name?: string;
    count?: number;
    amount?: number;
    total_count?: number;
    total_item?: number;
    total_amount?: number;
}

export interface InitialProductState
    extends Omit<ProductPostDataType, "id"> {}