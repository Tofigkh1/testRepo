import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../server/configs/firebase';

const AuthContext = createContext(null);

 const AuthContextProvider:any = ({ children }) => {
    const [useer, setUser] = useState(null);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        
        localStorage.setItem('access_token', accessToken); // access_token'ı kaydet

        setUser(result.user);
    };

    const logOut= async () => {
        await signOut(auth);
        localStorage.removeItem('access_token'); // Çıkış yapıldığında access_token'ı sil
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ useer, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};


export 