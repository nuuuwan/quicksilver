import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

// Mock data generator
const generateMockThreads = (count, type = "inbox") => {
  const participants = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com" },
    { id: "2", name: "Bob Smith", email: "bob@example.com" },
    { id: "3", name: "Carol Williams", email: "carol@example.com" },
    { id: "4", name: "David Brown", email: "david@example.com" },
    { id: "5", name: "Eva Martinez", email: "eva@example.com" },
  ];

  const subjects = [
    "Project Update",
    "Meeting Notes",
    "Budget Review",
    "Team Lunch",
    "Q1 Planning",
    "Client Feedback",
    "Design Review",
    "Weekly Sync",
    "Code Review",
    "Important Announcement",
  ];

  const messages = [
    "Let's discuss this in our next meeting.",
    "I've attached the document for your review.",
    "Thanks for the update!",
    "Can we schedule a call?",
    "Please review the changes and let me know.",
    "Great work on this!",
    "I have some questions about the proposal.",
    "Looking forward to hearing from you.",
    "This looks good to me.",
    "Let's move forward with this plan.",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `${type}-${i + 1}`,
    subject: subjects[i % subjects.length],
    participants: [participants[i % participants.length]],
    lastMessage: messages[i % messages.length],
    lastMessageTime: new Date(Date.now() - i * 3600000 * 2).toISOString(),
    unreadCount:
      type === "inbox"
        ? i % 3 === 0
          ? Math.floor(Math.random() * 5) + 1
          : 0
        : 0,
    hasAttachment: i % 4 === 0,
  }));
};

export const DataProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);
  const [sentThreads, setSentThreads] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [trashedThreads, setTrashedThreads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);

  // Load mock data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setThreads(generateMockThreads(12, "inbox"));
      setSentThreads(generateMockThreads(8, "sent"));
      setDrafts(generateMockThreads(3, "draft"));
      setTrashedThreads(generateMockThreads(5, "trash"));
      setContacts([
        { id: "1", name: "Alice Johnson", email: "alice@example.com" },
        { id: "2", name: "Bob Smith", email: "bob@example.com" },
        { id: "3", name: "Carol Williams", email: "carol@example.com" },
        { id: "4", name: "David Brown", email: "david@example.com" },
        { id: "5", name: "Eva Martinez", email: "eva@example.com" },
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const getThread = (id) => {
    return (
      threads.find((t) => t.id === id) ||
      sentThreads.find((t) => t.id === id) ||
      drafts.find((t) => t.id === id) ||
      trashedThreads.find((t) => t.id === id)
    );
  };

  const getMessages = (threadId) => {
    // Return messages for this thread from state, or generate mock messages
    if (messages[threadId]) {
      return messages[threadId];
    }

    // Mock messages for a thread
    const mockMessages = [
      {
        id: "msg-1",
        content: "Hi, this is the first message in the thread.",
        sender: { id: "1", name: "Alice Johnson", email: "alice@example.com" },
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        isRead: true,
      },
      {
        id: "msg-2",
        content:
          "Thanks for your message. I'll review this and get back to you.",
        sender: { id: "current", name: "You", email: "you@example.com" },
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isRead: true,
      },
    ];

    // Store the mock messages
    setMessages((prev) => ({ ...prev, [threadId]: mockMessages }));
    return mockMessages;
  };

  const sendMessage = async (threadId, content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage = {
          id: `msg-${Date.now()}`,
          content,
          sender: { id: "current", name: "You", email: "you@example.com" },
          timestamp: new Date().toISOString(),
          isRead: true,
        };

        setMessages((prev) => ({
          ...prev,
          [threadId]: [...(prev[threadId] || []), newMessage],
        }));

        resolve(newMessage);
      }, 200);
    });
  };

  const sendEmail = async (emailData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newThread = {
          id: `sent-${Date.now()}`,
          subject: emailData.subject,
          participants: emailData.to,
          lastMessage: emailData.body,
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
          hasAttachment: emailData.attachments?.length > 0,
        };
        setSentThreads((prev) => [newThread, ...prev]);
        resolve(newThread);
      }, 500);
    });
  };

  const saveDraft = async (draftData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDraft = {
          id: `draft-${Date.now()}`,
          subject: draftData.subject || "(No subject)",
          participants: draftData.to || [],
          lastMessage: draftData.body || "",
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
          hasAttachment: draftData.attachments?.length > 0,
        };
        setDrafts((prev) => [newDraft, ...prev]);
        resolve(newDraft);
      }, 300);
    });
  };

  const deleteThread = async (threadId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const thread =
          threads.find((t) => t.id === threadId) ||
          sentThreads.find((t) => t.id === threadId) ||
          drafts.find((t) => t.id === threadId);

        if (thread) {
          setThreads((prev) => prev.filter((t) => t.id !== threadId));
          setSentThreads((prev) => prev.filter((t) => t.id !== threadId));
          setDrafts((prev) => prev.filter((t) => t.id !== threadId));
          setTrashedThreads((prev) => [thread, ...prev]);
        }
        resolve();
      }, 300);
    });
  };

  const markAsRead = async (threadId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setThreads((prev) =>
          prev.map((t) => (t.id === threadId ? { ...t, unreadCount: 0 } : t)),
        );
        resolve();
      }, 200);
    });
  };

  const unreadCount = threads.reduce(
    (acc, thread) => acc + thread.unreadCount,
    0,
  );

  const value = {
    threads,
    sentThreads,
    drafts,
    trashedThreads,
    contacts,
    loading,
    unreadCount,
    getThread,
    getMessages,
    sendMessage,
    sendEmail,
    saveDraft,
    deleteThread,
    markAsRead,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;
