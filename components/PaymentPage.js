"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    // const { data: session } = useSession()
    const [paymentform, setPaymentform] = useState({
        name: '',
        email: '',
        amount: '',
        message: ''
    })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setpayments] = useState([])
    const SearchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (SearchParams.get("paymentdone") === "true") {
            toast('Thanks for your donation', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)
    }, [SearchParams, router, username])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setpayments(dbpayments)
    }

    const pay = async (amount) => {
        //Get the order id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": paymentform.name, //your customer's name
                "email": paymentform.email,
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"/>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="cover relative">
                <img
                    src={currentUser.coverPicture}
                    alt=""
                    className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <div className="absolute right-[45%] top-[85%] size-36 overflow-hidden">
                    <img
                        className="rounded-full object-cover border-4 border-white shadow-lg size-36"
                        src={currentUser.profilePicture}
                        alt=""
                    />
                </div>
            </div>
            <div className="info flex flex-col justify-center items-center my-16 gap-4">
                <div className="font-bold text-2xl text-white mt-10">
                    @{username}
                </div>
                <div className="text-slate-500 font-medium">
                    Lets help {username} get a chai!
                </div>
                <div className="text-slate-400">
                    {payments.length} Payments .
                    ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>

                <div className="payment flex flex-col md:flex-row gap-8 w-[90%] mt-10">
                    {/* Supporters List */}
                    <div className="supporters w-full md:w-1/2 bg-gray-900 text-white rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Top 5 Supporters</h2>
                        <ul className="space-y-3">
                            {payments.length === 0 && <li>No payments yet</li>}
                            {payments.map((p, i) => (
                                <li key={i} className="flex gap-2 items-center mx-4">
                                    <img width={33} src="/user.png" alt="user" />
                                    {p.name} donated <span className="font-bold">₹{p.amount}</span> with a message "{p.message}"
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Make a Payment Section */}
                    <div className="makePayment w-full md:w-1/2 bg-gray-900 text-white rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Make a Payment</h2>
                        <div className="flex flex-col gap-4">
                            <input onChange={handleChange} value={paymentform.name}
                                name="name"
                                type="text"
                                className="w-full p-4 rounded-lg bg-gray-800 placeholder-gray-400 focus:outline-none"
                                placeholder="Enter Name"
                            />
                            <input onChange={handleChange} value={paymentform.message}
                                name="message"
                                type="text"
                                className="w-full p-4 rounded-lg bg-gray-800 placeholder-gray-400 focus:outline-none"
                                placeholder="Enter Message"
                            />
                            <input onChange={handleChange} value={paymentform.amount}
                                name="amount"
                                type="text"
                                className="w-full p-4 rounded-lg bg-gray-800 placeholder-gray-400 focus:outline-none"
                                placeholder="Enter Amount"
                            />
                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                                type="button"
                                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md disabled:bg-slate-600 disabled:from-purple-100" 
                                disabled={paymentform.name.length < 3 || paymentform.message.length < 4 || paymentform.amount?.length < 1}
                            >
                                Pay
                            </button>
                        </div>
                        {/* Preset Payment Options */}
                        <div className="flex justify-around mt-6 gap-3">
                            <button className="bg-gray-800 rounded-lg py-3 px-5 hover:bg-gray-700 transition" onClick={() => pay(1000)}>
                                Pay ₹10
                            </button>
                            <button className="bg-gray-800 rounded-lg py-3 px-5 hover:bg-gray-700 transition" onClick={() => pay(2000)}>
                                Pay ₹20
                            </button>
                            <button className="bg-gray-800 rounded-lg py-3 px-5 hover:bg-gray-700 transition" onClick={() => pay(3000)}>
                                Pay ₹30
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage;
