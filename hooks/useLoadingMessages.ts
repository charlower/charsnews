import { useEffect, useState } from 'react';

interface LoadingMessage {
  text: string;
  delay: number;
}

export default function useLoadingMessages(chatCompleteLoading: boolean) {
  const [displayString, setDisplayString] = useState(
    '🔍 Searching for news...'
  );

  useEffect(() => {
    // Reset display string and clear existing timeouts if any
    setDisplayString('🔍 Searching for news...');
    const messages: LoadingMessage[] = [
      { text: '📰 Gathering headlines...', delay: 5000 },
      { text: '🌎 Scanning the latest stories...', delay: 10000 },
      { text: '💡 Finding top insights...', delay: 15000 },
      { text: '⌛ Almost there...', delay: 20000 },
      { text: '✅ Wrapping it up...', delay: 25000 },
    ];

    const timeouts: NodeJS.Timeout[] = [];
    messages.forEach((message) => {
      const timeout = setTimeout(() => {
        setDisplayString(message.text);
      }, message.delay);
      timeouts.push(timeout);
    });

    // Cleanup function to clear timeouts when the component unmounts or chatCompleteLoading changes
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [chatCompleteLoading]); // Add chatCompleteLoading as a dependency to reset the messages

  return displayString;
}
