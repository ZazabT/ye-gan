import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import bookingStore from "../../stores/BookingStore";
import userAuthStore from "../../stores/UserAuthStore";
import hostProfileStore from "../../stores/HostProfile";
import HostNavBar from "../profile/components/HostNavBar";

const MessageRoom = () => {
    const { id } = useParams();
    const { getBookingById, booking, error: bookingError, loading: bookingLoading } = bookingStore();
    const { getHostProfile, hostProfile, error: hostProfileError, loading: hostProfileLoading } = hostProfileStore();
    const { token, user } = userAuthStore();

    // State for managing messages
    const [messages, setMessages] = useState([
        {
            sender: "Alice",
            text: "Hey Bob, how's it going?",
            avatar: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
            timestamp: "10:00 AM"
        },
        {
            sender: "Bob",
            text: "Hi Alice! I'm good, just finished a great book. How about you?",
            avatar: "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
            timestamp: "10:01 AM"
        },
        // Add more demo messages here if needed
    ]);

    const [newMessage, setNewMessage] = useState("");

    // Update navLinks to include dynamic booking ID
    const navLinks = [
        { path: `/host-profile-booking/${id}`, label: 'Bookings' },
        { path: '/message', label: 'Messages' }
    ];

    useEffect(() => {
        getBookingById(id, token);
        getHostProfile(user.id, token);
    }, [getBookingById, id, token, getHostProfile, user.id]);

    if (bookingLoading || hostProfileLoading) {
        return <p>Loading...</p>;
    }

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const messageToSend = {
                sender: "Bob", // Assuming Bob is the user sending the message
                text: newMessage,
                avatar: "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, messageToSend]);
            setNewMessage("");
        }
    };

    return (
        <>
            <HostNavBar navLinks={navLinks} hostProfile={hostProfile} />

<div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r border-gray-300">
                <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                    <h1 className="text-2xl font-semibold">Chat Web</h1>
                </header>
                <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                            <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">Alice</h2>
                            <p className="text-gray-600">Hoorayy!!</p>
                        </div>
                    </div>
                    {/* Add more contacts here if needed */}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white p-4 text-gray-700">
                    <h1 className="text-2xl font-semibold">Chat with Alice</h1>
                </header>

                {/* Chat Messages */}
                <div className="h-full flex-1 overflow-y-auto p-4 pb-20">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex mb-4 ${message.sender === "Bob" ? 'justify-end' : ''}`}>
                            {message.sender !== "Bob" && (
                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                    <img src={message.avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                                </div>
                            )}
                            <div className={`flex max-w-96 ${message.sender === "Bob" ? 'bg-indigo-500 text-white' : 'bg-white'} rounded-lg p-3 gap-3`}>
                                <p>{message.text}</p>
                            </div>
                            {message.sender === "Bob" && (
                                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                    <img src={message.avatar} alt="My Avatar" className="w-8 h-8 rounded-full" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Chat Input Area */}
                <div className="p-4 bg-white border-t border-gray-300 flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 border rounded-lg p-2"
                    />
                    <button 
                        onClick={handleSendMessage} 
                        className="bg-indigo-600 text-white rounded-lg px-4 py-2 ml-2"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
        </>
     
    );
}

export default MessageRoom;
