import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    confirmPasswordReset
} from "firebase/auth";
import { auth } from "../helpers/init-firebase";

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    login: () => Promise,
    logout: () => Promise,
    signInWithGoogle: () => Promise,
    forgotPassword: () => Promise,
    resetPassword: () => Promise
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user ? user : null)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        console.log('The user is', currentUser)
    }, [currentUser])

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    function forgotPassword(email) {
        return sendPasswordResetEmail(auth, email, {
            url: `http://localhost:3000/login`,
        })
    }

    function resetPassword(oobCode, newPassword) {
        return confirmPasswordReset(auth, oobCode, newPassword)
    }

    function logout() {
        return signOut(auth)
    }

    const value = {
        currentUser,
        register,
        login,
        logout,
        signInWithGoogle,
        forgotPassword,
        resetPassword
    }

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}