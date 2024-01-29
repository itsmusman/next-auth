"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("res Login", response)
            router.push('/profile')
        } catch (error: any) {
            console.log('err Login', error);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };


    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing..." : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                id="email"
                type="text"
                placeholder="Enter Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <label htmlFor="password">password</label>
            <input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            />

            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "Fill Form" : "Login"}</button>
            <Link href='/signup'>Signup</Link>
        </div>
    )
}