import { useEffect, useState , useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import guestProfileStore from '../../stores/GuestProfile';
import messageStore from '../../stores/MessageStore';
import conversationStore from '../../stores/ConversationStore';
import userAuthStore from '../../stores/UserAuthStore';
import GuestNavBar from '../profile/components/GuestNavBar';
import wallapaper from '../../assets/wallapaper.jpeg';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { Input, Button } from "@material-tailwind/react";

const MessageRoom = () => {
    const { id } = useParams(); // User ID
    const navigate = useNavigate();
    const backEndUrl = 'http://localhost:8000';

    const { token, user } = userAuthStore();
    const { getGuestProfile, guestProfile, loading: guestProfileLoading, error: guestProfileError } = guestProfileStore();
    const { sendMessage } = messageStore();
    const { users, usersConversationWith, getMessageForConversation, loading: conversationLoading, messages } = conversationStore();

    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [sending, setSending] = useState(false);

    // Ref for scrolling to the last message
    const messagesEndRef = useRef(null);

    // Nav links
    const navLinks = [
        { path: '/guest-profile', label: 'My Profile' },
        { path: '/guest-profile-bookings', label: 'Bookings' },
        { path: guestProfile ? `/guest/messages/${guestProfile.id}` : '', label: 'Messages' },
        { path: '/guest/reviews', label: 'Reviews' }
    ].filter(link => link.path); // Remove empty paths

    // Fetch user profile and conversations
    useEffect(() => {
        const fetchGuestProfile = async () => {
            if (user && token) {
                try {
                    await usersConversationWith(id, token);
                    await getGuestProfile(user.id, token);  
                } catch (error) {
                    console.error("Failed to fetch guest profile:", error);
                }
            } else {
                navigate("/login");
            }
        };

        fetchGuestProfile();
    }, [user, token, getGuestProfile, usersConversationWith, navigate, id]);

    useEffect(() => {
        if (selectedConversationId) {
            getMessageForConversation(selectedConversationId, token);
        }
}, [selectedConversationId, getMessageForConversation, token]);
  // Automatically set the first conversation as the selected one
useEffect(() => {
    if (users && users.length > 0 && !selectedConversationId) {
        // Set the first conversation if no conversation is selected
        setSelectedConversationId(users[0]?.conversation.id);
    }
}, [users, selectedConversationId]);

    // Scroll to the bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]); 

    if (guestProfileLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (guestProfileError) {
        return <div>Error loading profile: {guestProfileError}</div>;
    }

    // Handle sending a message
    const handleSendMessage = async () => {
        if (messageText.trim() && selectedConversationId) {
            setSending(true);
            const success = await sendMessage(selectedConversationId, messageText, token, user.id);
            if (success) {
                setMessageText('');
                getMessageForConversation(selectedConversationId, token);
            } else {
                alert('Failed to send message. Please try again.');
            }
            setSending(false);
        }
    };
    return (
            <div className="flex h-screen antialiased text-gray-800 bg-gray-100">
            <div className="flex flex-row overflow-x-hidden h-full w-full">
                {/* Sidebar */}
                <div className="flex flex-col py-8 pl-6 pr-2 w-64 flex-shrink-0 bg-white shadow-lg">
                    <div className="flex flex-row items-center justify-center h-12 w-full">
                        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                            </svg>
                        </div>
                        <div className="ml-2 font-bold text-2xl">Messages</div>
                    </div>

                    {/* Host Profile */}
                    <div className="flex flex-col items-center bg-green-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                    <div className="h-20 w-20 rounded-full border overflow-hidden flex items-center justify-center bg-gray-200 text-xl font-bold text-gray-700">
                        {guestProfile?.profilePicture ? (
                            // Show profile picture if available
                            <img
                            src={`${backEndUrl}/${guestProfile.profilePicture}`}
                            alt="Avatar"
                            className="h-full w-full object-cover"
                            />
                        ) : (
                            // Show first character of username or first name as fallback
                            <span className='text-3xl'>
                            {guestProfile?.username
                                ? guestProfile.username.charAt(0).toUpperCase() 
                                : guestProfile?.user?.firstName?.charAt(0).toUpperCase() + guestProfile?.user?.lastName?.charAt(0).toUpperCase() }
                            </span>
                        )}
                        </div>

                        <div className="text-sm font-semibold mt-2">{guestProfile?.userName || `${guestProfile?.user?.firstName} ${guestProfile?.user?.lastName}`}</div>
                    </div>

                    {/* Active Conversations */}
                    <div className="flex flex-col mt-8">
                        <div className="flex flex-row items-center justify-between text-xs">
                            <span className="font-bold">Active Conversations</span>
                            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">{users?.length}</span>
                        </div>

                        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
    {
    // conversationLoading ? (
    //     // Show loading indicator while loading
    //     <div className="flex justify-center items-center">
    //     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    //    </div>
    // ) : 
    users && users.length > 0 ? (
        // Show conversations if available
        users.map((conversationUser, index) => (
            <button
                key={conversationUser?.conversation.id}
                onClick={() => setSelectedConversationId(conversationUser?.conversation.id)}
                className={`flex flex-row items-center w-full text-left px-4 py-2 rounded-xl mb-2 transition duration-300 ease-in-out ${selectedConversationId === conversationUser?.conversation.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white'}`}
            >
                <div className={`flex items-center justify-center h-8 w-8 ${index % 2 === 0 ? 'bg-indigo-200' : 'bg-gray-200'} rounded-full`}>
                    {conversationUser?.user.username ? conversationUser?.user.username.charAt(0) : (conversationUser?.user.user.firstName?.charAt(0) + conversationUser?.user.user.lastName?.charAt(0))}
                </div>
                <div className="ml-2 text-sm font-semibold">
                    {conversationUser?.user.username || `${conversationUser?.user.user.firstName} ${conversationUser?.user.user.lastName}`}
                </div>
                {conversationUser?.unreadMessages > 0 && (
                    <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded-full leading-none">
                        {conversationUser?.unreadMessages}
                    </div>
                )}
            </button>
        ))
    ) : (
        // Show no conversations message if users array is empty
        <p className="text-gray-500 text-center">No conversations found</p>
    )}
                        </div>

                    </div>
                </div>

                {/* Messages Section */}
                <div className="w-full flex flex-col h-full overflow-hidden ">
                {/* style={{ backgroundImage: `url(${wallapaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }} */}
                    {selectedConversationId && (
                       <div className="flex flex-col h-full bg-white p-4 shadow-lg rounded-lg overflow-y-auto">
  
                            {/* Display Messages */}
                            <div className="flex flex-col flex-grow overflow-y-auto bg-white">
                                {messages && messages.length > 0 ? (
                                    messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`flex flex-row ${message.sender_id === user.id ? 'flex-row-reverse' : ''} mx-4`}
                                        >
                                            <div className="flex flex-col">
                                                {/* Sender's Name */}
                                                <div className="text-xs text-gray-500">
                                                    {message.sender_id === user.id ? 'You' : message.sender_name}
                                                </div>
                                                {/* Message */}
                                                <div className={`max-w-lg break-words px-3.5 py-2 rounded-3xl  justify-start items-center ${message.sender_id === user.id ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-200 rounded-tl-none'}`}>
                                                    {message.message}
                                                </div>

                                                  {/*Time*/}
                                                  <div className="justify-end items-center inline-flex mb-2.5 text-xs">   
                                                  {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                 </div>
        
         
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">No messages yet</p>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="relative flex flex-col h-14 w-full p-4">
                            {/* Send Message Input */}
                            <div className="flex w-full items-center space-x-2">
                                {/* Input Field */}
                                <Input
                                    className="flex-grow border-2 border-indigo-500 rounded-lg px-4 py-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-95 transition duration-200"
                                    placeholder="Type your message..."
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !sending) {
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                
                                {/* Send Button */}
                                <Button
                                    onClick={handleSendMessage}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 px-4 text-sm flex items-center space-x-2 transition-all duration-300 active:scale-105"
                                    disabled={sending || !messageText.trim()}
                                >
                                    {/* Icon and Text */}
                                    <PaperAirplaneIcon className="h-5 w-5" />
                                    <span>Send</span>
                                </Button>
                            </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>

        
    );
};

export default MessageRoom;