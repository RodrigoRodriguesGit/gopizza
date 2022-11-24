// Importações das Bibliotecas
import { ReactNativeFirebase } from "@react-native-firebase/app";
import React, {
    createContext, 
    useContext, 
    useState, 
    ReactNode
}
from "react";
import auth from '@react-native-firebase/auth'
import { Alert } from "react-native";
import firesotre from '@react-native-firebase/firesotre'

// Tipagens

type User = {
    id: string;
    name: string;
    isAdmin: boolean;
}

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    isLogging: boolean
    user: User | null
}

type AuthProviderProps = { children:  ReactNode }

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps){

    const [user, setUser] = useState<User | null>(null)

    const [isLogging, setIsLoging] = useState(false)
        
    async function signIn(email: string, password: string) {
        
        if(!email || !password) {
            return Alert.alert('Login', 'Informe o e-mail e a senha')
        }

        setIsLoging(true)

        auth()
        .signInWithEmailAndPassword(email, password)
        .then(account => {
            console.log(account);
        }).catch(error => {
            const { code } = error

            if (code === 'auth/user-not-found' || code === 'auth/wrong-password' ){
                return Alert.alert('Login', 'E-mail e/ou senha inválidos')
            }else{
                return Alert.alert('Login', 'Não foi possível realizar o login')
            }
       }).finally(() => setIsLoging(false))

    }

    return(
        <AuthContext.Provider value={{
            signIn,
            isLogging
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    
    const context = useContext(AuthContext)
    return context

}

export { AuthProvider, useAuth }