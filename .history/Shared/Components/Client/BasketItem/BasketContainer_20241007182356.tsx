import styles from "../../../../pages/user/basket/basket.module.css";
import BasketSvg from "../../../../public/basketicon.png";
import BasketItem from "./index";
import React, {useEffect, useState} from "react";
// import EmptyBasket from '../EmptyBasket/index'
import {clearBasket, deleteBasket, GetBasket, getCategories} from "../../../../Services/index";
import {useMutation, useQuery, useQueryClient} from ";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useRouter} from "next/router";
import RemoveSvg from "../svg/RemoveSvg";
import {BasketPostDataType} from "../../../interfaces";
import {useToast} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

type BasketProps = {
    productCount?: number;
    data_list?: string[],
    size: string
}

export default function BasketContainer(props: BasketProps) {
    let {size} = props
    let {push}=useRouter()
    const [userLoaded, setUserLoaded] = useState(false);
    const { t } = useTranslation("common");
    const { data: basketList, isLoading: basketLoading } = useQuery("basket", GetBasket, {
        enabled: userLoaded
    });
    let basket_list = basketList?.data.result.data;
    const user = useSelector((state: RootState) => state.user);
    const toast = useToast()
    const queryClient = useQueryClient();
    
    const mutationClear = useMutation(
        (basketProduct: BasketPostDataType) => clearBasket(basketProduct),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('basket');
                toast({
                    title: `Product deleted successfully!`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position:'top-right',
                    variant:'subtle'
                })
            },
            onError: (error) => {
                console.error("Error deleting basket:", error);
                // toast.error("Error deleting basket", {
                //     autoClose: 1000,
                // });
                toast({
                    title: `Error deleting basket: ${error}`,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position:'top-right',
                    variant:'subtle'
                })
            },
        }
    );
    function handleClear(){
        const basketId = {
            user_id: user.id,
            basket_id: basket_list?.id
        }
        mutationClear.mutate(basketId);
    }
    useEffect(() => {
        if (user.id) {
            setUserLoaded(true);
        }
    }, [user.id]);

    return (
        <>
            {/*{basketLoading?*/}
            {/*    <Loading/>:*/}
                <div className={`${styles.user_cabinet_box} ${styles[size]}`}>
                    {basket_list?.items.length>0?
                        <>
                            <div className="min-h-[550px] flex justify-between flex-col">
                                <div>
                                    <h2 className={styles.user_cabinet_title}>
                                        {t("Your Basket")}
                                    </h2>
                                    <div className="flex justify-between items-center mb-5">
                                        <div className={styles.item_counts}>
                                            <BasketSvg/> <span>{basket_list?.items.length} {t("items")}</span>
                                        </div>
                                        <button onClick={handleClear} className={`lightRed gap-2 flex items-center capitalize ${styles.clear_btn}`}><RemoveSvg/>{t("clear all")}</button>
                                    </div>

                                    <div className={styles.basket_list}>
                                        {basket_list?.items?.map((product:any) => (
                                            <BasketItem  total_count={basket_list.total_count} basket_id={basket_list.id} total_amount={basket_list.total_amount}  key={product.id}  {...product} />
                                        ))}
                                    </div>
                                </div>
                                <button className={styles.checkout_btn} onClick={()=>push('/user/checkout')}>
                                <span>
                                    {t("Checkout")}
                                </span>
                                    <p>
                                        &#8380; {basket_list.total_amount}
                                    </p>
                                </button>
                            </div>
                        </> :
                        <EmptyBasket/>
                    }
                </div>
            {/*}*/}

        </>
    )
}


