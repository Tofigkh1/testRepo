import React, { useEffect, useState,useContext, createContext } from 'react'
import Categories from '../../../Shared/Components/Client/headerCategory'
import withClientAuth from '../../../Shared/HOC/withClienAuth';
import styleds from 'styled-components';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Nav from '../../../Shared/Components/Client/Nav/Nav';
import BasketMenu from '../../../Shared/Components/sliderBasket/sliderBasket';
import Auth from '../../../Shared/Components/Client/Auth/Auth';
import styles from './checkout.module.css';
import Navbar from '../../../Shared/Components/Client/User-Layout';
import { useDispatch, useSelector } from 'react-redux';
import userProfileIcon from '../../../public/userProfileIcon.svg'
import basket from '../../../public/basketicon.png'
import logoutSvg from '../../../public/logout (1).png'
import LogoutIcon from '../../../public/logout (2).png'
import LogoutIcon2 from '../../../public/exit.png'
import checkoutSvg from '../../../public/checkout.png'
import basketDef from '../../../public/basketDef.png'
import profileSettings from '../../../public/profileSettings.png'
import orderSvg from '../../../public/order.png'
import userProfileDef from '../../../public/user.png'
import { AuthContext, AuthContextProvider } from '../../../Shared/Context';



import shoppingBag from '../../../public/shopping-bag.png'
import ShoppingCheck from '../../../public/ShoppingCheck3.png'
import YourOrders from '../../../public/fulfillment.png'


import { LifeBuoy, Receipt, Boxes, Package, UserCircle,BarChart3, LayoutDashboard, Settings } from 'lucide-react';
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import Sidebar, { SidebarItem } from '../../../Shared/Components/Client/SideBarMenu';
import { AppDispatch, RootState } from '../../../Shared/Redux/Store/store';
import { clearUser, setUser } from '../../../Shared/Redux/Featuries/User/userSlice';


// Sidebar context oluşturuldu
const SidebarContext = createContext();

// Styled Components
const Container = styleds.div`
  font-family: Arial, sans-serif;
`;

const Header = styleds.header`
  background: linear-gradient(135deg, #7f00ff, #e100ff);
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainSection = styleds.section`
  position: relative;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;

`;

const Curve = styleds.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99%;
  background: #7f00ff;
  clip-path: ellipse(80% 50% at 50% 0%);
`;

const theme = createTheme();
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    width: '16px', // Boyutu artırdık
    height: '16px', // Boyutu artırdık
    borderRadius: '50%',
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '16px',
      height: '16px',
      borderRadius: '20px',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const StyledBadge2 = styled(Badge)`
  & .MuiBadge-badge {
    background-color: red;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.background.paper};
  }
  @keyframes ripple {
    0% {
      transform: scale(.8);
      opacity: 1;
    }
    100% {
      transform: scale(2.4);
      opacity: 0;
    }
  }
`;

const LargeAvatar = styled(Avatar)({
  width: 100,
  height: 100,
});


const initialState = {
  address: '',
  phoneNumber: '+994',
  error: '',
  formatMessage: '',
  errorNumber: '',
  formatNumber: '',
}


type OrderState = {
  id: string,
  created: number | string,
  delivery_address: string | number,
  contact: number,
  payment_method: string
}

type BasketProps = {
  productCount?: number;
  data_list?: string[],
  size: string
}



const reducer = (state:any, action:any) => {
  switch (action.type) {
      case "SET_ADDRESS":
          return { ...state, address: action.payload };
      case "SET_PHONE_NUMBER":
          return { ...state, phoneNumber: action.payload };
      case "SET_ERROR":
          return { ...state, error: action.payload };
      case "SET_FORMAT_MESSAGE":
          return { ...state, formatMessage: action.payload };
      case "SET_ERROR_NUMBER":
          return { ...state, errorNumber: action.payload };
      case "SET_FORMAT_NUMBER":
          return { ...state, formatNumber: action.payload };

      default:
          return state;
  }
}

const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
const azerbaijanPhoneRegex = /^\+994-(50|51|55|60|70|77|99)-\d{3}-\d{2}-\d{2}$/;

const formatPhoneNumber = (value:any) => {
  const digits = value.replace(/[^\d]/g, '').substring(3);
  let formatted = '+994';

  if (digits.length > 2) {
      formatted += '-' + digits.substring(0, 2);
  } else {
      formatted += '-' + digits;
  }
  if (digits.length > 5) {
      formatted += '-' + digits.substring(2, 5);
  } else if (digits.length > 2) {
      formatted += '-' + digits.substring(2);
  }
  if (digits.length > 7) {
      formatted += '-' + digits.substring(5, 7);
  } else if (digits.length > 5) {
      formatted += '-' + digits.substring(5);
  }
  if (digits.length > 9) {
      formatted += '-' + digits.substring(7, 9);
  } else if (digits.length > 7) {
      formatted += '-' + digits.substring(7);
  }

  return formatted;
};


export default function index() {



  const [activeIndex, setActiveIndex] = useState<number>(4);
  const { push } = useRouter();
  const [downloadURL, setDownloadURL] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const [mobile, setmobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);


  const handleSignout = async()=> {
    try{
      await logOut()
      console.log("logut check...");
      
    } catch(error) {
      console.log(error);
      
    }
  }


  useEffect(() => {
  

    if (window.innerWidth < 800) {
      setmobile(true);
    } else {
      setmobile(false);
    }
    const token = localStorage.getItem('access_token');
    const userInfo = localStorage.getItem('user_info');
    if (!token) {
  
      push('/login-register');
    }
  

    if (token && userInfo) {
      setIsLoggedIn(true);
    }
   


 
  }, [mobile]);


  return (
   <>
     <Container>
        <Header>
          <div className={styles.cursor}>
            <img
              onClick={() => push('/')}
              style={{ width: '90px', height: '90px' }}
              className={styles.logo}
              src="/Logo.png"
              alt="Logo"
            />
          </div>
          <Nav />

          <div className="flex gap-10 z-50">
                        <BasketMenu/>
                        <Auth/>
                        </div>
        </Header>


        
      </Container>

      <Categories/>

      {/* <div className={mobile ? 'hidden' : ' w-80'}>
            <Navbar active={4} />
          </div> */}


<div className='flex gap-52'>



<Sidebar>
        <SidebarItem
          icon={<img src="/userProfileIcon.svg" alt="Profile" width={39} height={39} />}
          text="Your Profile"
          active={activeIndex === 1}
          onClick={()=>push('/user/profile')}
        />
        <SidebarItem
          icon={<img src="/shopping-bag.png" alt="Basket" width={39} height={39} />}
          text="Your Basket"
          active={activeIndex === 2}
          onClick={()=>push('/user/basket')}
        />
        <SidebarItem
          icon={<img src="/fulfillment.png" alt="Orders" width={39} height={39} />}
          text="Your Orders"
          active={activeIndex === 3}
          onClick={()=>push('/user/orders')}
        />
        <SidebarItem
          icon={<img src="/ShoppingCheck3.png" alt="Checkout" width={39} height={39} />}
          text="Checkout"
          active={activeIndex === 4}
          onClick={()=>push('/user/checkout')}
        />
        <SidebarItem
          icon={<img src="/exit.png" alt="Logout" width={39} height={39} />}
          text="Logout"
          active={activeIndex === 5}
          onClick={()=>{
            push('/')
            localStorage.removeItem("user_info")
            localStorage.removeItem("access_token")
            handleSignout()
            setUser(null);
            dispatch(clearUser());
          
        }}
        />
      </Sidebar>


      <div>
        <h1>sdfksjgfkjsfd</h1>
      </div>


      </div>

   </>
  )
}
