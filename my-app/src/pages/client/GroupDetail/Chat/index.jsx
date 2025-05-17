const messages = [
  {
    sender: "Ly Truong",
    avatar: "https://via.placeholder.com/40",
    time: "10:30 AM",
    content:
      "Hey everyone! I just added the dinner expense from last night. Please check and let me know if the split looks correct.",
    isCurrentUser: true,
  },
  {
    sender: "John Doe",
    avatar: "https://via.placeholder.com/40",
    time: "10:32 AM",
    content: "Thanks! I'll check it now.",
    isCurrentUser: false,
  },
  {
    sender: "Jane Smith",
    avatar: "https://via.placeholder.com/40",
    time: "10:35 AM",
    content: "Looks good to me! Thanks for organizing everything.",
    isCurrentUser: false,
  },
  {
    sender: "Ly Truong",
    avatar: "https://via.placeholder.com/40",
    time: "10:38 AM",
    content: "Great! I'll add the taxi expenses later today.",
    isCurrentUser: true,
  },
  {
    sender: "John Doe",
    avatar: "https://via.placeholder.com/40",
    time: "10:40 AM",
    content: "Sounds good! Let me know when it's added.",
    isCurrentUser: false,
  },
  {
    sender: "Jane Smith",
    avatar: "https://via.placeholder.com/40",
    time: "10:42 AM",
    content: "Can we also split the hotel bill soon?",
    isCurrentUser: false,
  },
  {
    sender: "Ly Truong",
    avatar: "https://via.placeholder.com/40",
    time: "10:45 AM",
    content: "Sure, I'll add that tomorrow.",
    isCurrentUser: true,
  },
];

function Chat() {
  return (
    <div className="flex flex-col h-[calc(100vh-340px)]">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              message.isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            {!message.isCurrentUser && (
              <img
                // src={message.avatar}
                alt={message.sender}
                className="w-10 h-10 rounded-full mr-3"
              />
            )}
            <div className="flex flex-col max-w-[70%]">
              <div className="flex items-center">
                {!message.isCurrentUser && (
                  <span className="text-sm font-semibold text-gray-800 mr-2">
                    {message.sender}
                  </span>
                )}
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  message.isCurrentUser
                    ? "bg-purple-100 text-gray-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.content}
              </div>
            </div>
            {message.isCurrentUser && (
              <img
                src={message.avatar}
                alt={message.sender}
                className="w-10 h-10 rounded-full ml-3"
              />
            )}
          </div>
        ))}
      </div>
      <div className="p-6 border-t border-gray-200 flex items-center ">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700"
        />
        <button className="ml-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
