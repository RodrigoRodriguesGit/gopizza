// Importações das Bibliotecas
import { ReactNativeFirebase } from "@react-native-firebase/app";
import React, {
    createContext, 
    useContext, 
    useState, 
    ReactNode,
    useEffect
}
from "react";
import auth from '@react-native-firebase/auth'
import { Alert } from "react-native";
import firesotre from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage' 


// Tipagens

type User = {
    id: string;
    name: string;
    isAdmin: boolean;
}

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    isLogging: boolean
    user: User | null
}

type AuthProviderProps = { children:  ReactNode }

const USER_COLLECTION = '@gopizza:users'

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
            firesotre()
            .collection('users')
            .doc(account.user.uid)
            .get()
            .then(async profile => {
                const { name, isAdmin} = profile.data() as User

                // <#####> Busca dos dados do Usuário <#####>
                if(profile.exists){
                    const userData = {
                        id: account.user.uid,
                        name,
                        isAdmin 
                    }

                    console.log(userData)

                    await asyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData))

                    setUser(userData)

                }


            }).catch(() => Alert.alert('Login', 'Não foi possível buscar os dados de perfil de usuário'))

        }).catch(error => {
            const { code } = error

            if (code === 'auth/user-not-found' || code === 'auth/wrong-password' ){
                return Alert.alert('Login', 'E-mail e/ou senha inválidos')
            }else{
                return Alert.alert('Login', 'Não foi possível realizar o login')
            }
       }).finally(() => setIsLoging(false))

    }

    async function loadUserStorageData() {
        
        setIsLoging(true)

        const storedUser = await asyncStorage.getItem(USER_COLLECTION)

        console.log(storedUser)

        if(storedUser){
            const userData = JSON.parse(storedUser) as User
            setUser(userData)
        }

        setIsLoging(false)

    }

    async function signOut() {
        await auth().signOut()
        await asyncStorage.removeItem(USER_COLLECTION)
        setUser(null)
    }

    async function forgotPassword(email: string) {
        if(!email){
            return Alert.alert('Redefinir senha', 'Informe o e-mail')
        }

        auth()
        .sendPasswordResetEmail(email)
        .then(() => Alert.alert('Redefinir senha', 'Enviamos um link no seu e-mail para redefinir sua senha'))
        .catch(() => Alert.alert('Redefinir senha', 'Não foi possível enviar e-mail para redefinir senha'))
        
    }

    useEffect(() => {
        loadUserStorageData()
    }, [])

    return(
        <AuthContext.Provider value={{
            signIn,
            signOut,
            isLogging,
            forgotPassword,
            user
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