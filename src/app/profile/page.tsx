"use client"

import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState("nothing")
    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log('res logout', response);
            toast.success('Logout Successfully')
            router.push('/login')
        } catch (error: any) {
            console.log('err', error.message);
            toast.error(error.message)

        }
    };

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/me");
            console.log('res me', response.data);
            setUser(response.data.data._id);
        } catch (error: any) {
            console.log('err', error.message);
            toast.error(error.message)

        }
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <h2 className="p-1 rounded bg-green-500">{user === 'nothing' ? "Nothing" : <Link href={`/profile/${user}`}>{user}</Link>}</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded" onClick={logout}>Logout</button>
        </div>
    )
}