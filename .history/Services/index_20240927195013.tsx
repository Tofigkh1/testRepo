import { AxiosPromise } from "axios"
import { instanceAxios } from "../Shared/Helpers/instanceAxios"
import {
    CategoryApiResponse,
    ApiResponse,
    ProductSingleApiResponse,
    BasketPostDataType,
    OrderPostDataType
} from "../Shared/Interface";

export const PutAuthUser = (body: object) => {


    return instanceAxios({
        method: "GET",
        url: "auth/user",
        data: body,
     
    })
}


export const getProductsById = (
    productsID: string | number
): AxiosPromise<ProductSingleApiResponse> =>
    instanceAxios({
        method: "GET",
        url: `products/${productsID}`,
    });

    

export const postSignUp = (body:object) => {

    
    return instanceAxios({
        method: "POST",
        url: "auth/signup",
        data: body
    })
}



export const PutAuthUserr = (body: object): AxiosPromise => {
  
    return instanceAxios({
        method: "PUT",
        url: "auth/user",
        data: body,
    });
};



export const AddBasket: (basketProduct: BasketPostDataType) => AxiosPromise<BasketPostDataType> = (basketProduct) => {

    return instanceAxios({
        method: "POST",
        url: `basket/add`,
        data: basketProduct,
    });
};



export const deleteBasket: (
    basketProduct: BasketPostDataType
) => AxiosPromise<BasketPostDataType> = (basketProduct) => {

    return instanceAxios({
        method: "DELETE",
        url: `basket/delete`,
        data: basketProduct,
    });
};

export const clearBasket: (
    basketId: BasketPostDataType
) => AxiosPromise<BasketPostDataType> = (basketId) => {

    return instanceAxios({
        method: "DELETE",
        url: `basket/clear`,
        data: basketId,
    });
};


export const GetBasket = (): AxiosPromise => {

    return instanceAxios({
        method: "GET",
        url: "basket",
    });
};


export async function GetOrder() {

    try {
        const accessToken = localStorage.getItem("access_token");

        const response = await instanceAxios.get(`/order`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            return response;
    }catch (error){
        console.log("orders error", error)
    }

};


export const AddOrder: (orderBasket:OrderPostDataType) => AxiosPromise<OrderPostDataType> = (orderBasket) =>{


    return instanceAxios ({
        method: "POST",
        url:`order`,
        data: orderBasket,
    });
};


export const GetOrderHistory = () => {


    return instanceAxios ({
        method: "GET",
        url: "order/history",
   
    })
}

export async function GetOrderByUser() {
    try {
        const response = await instanceAxios.get(`order/history`);
        return response;
    } catch (error) {
        console.error(error);
        throw error; // Hata durumunu dışarıya iletmek için eklenebilir
    }
}

// Sipariş silme fonksiyonu
export async function deleteOrder(id: string | number) {
    try {
        const response = await instanceAxios.delete(`/order`, {
            data: {
                order_id: id,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



export const getCategories = (): AxiosPromise<CategoryApiResponse> =>
    instanceAxios({method: "GET", url: "category"});

export const GetProducts = (): AxiosPromise<ApiResponse> =>
    instanceAxios({method: "GET", url: 'products'});