import React, { useState, useEffect } from 'react';

const fetchFromOpenAI = async (query: string) => {
    const response = await fetch('https://monkfish-app-v42dg.ondigitalocean.app/api/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data;
};

const OpenAIComponent: React.FC = () => {
    const [query, setQuery] = useState('');
    const [conversation, setConversation] = useState<{ question: string; answer: string } | null>(null);
    const [displayedAnswer, setDisplayedAnswer] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await fetchFromOpenAI(query);
            const aiResponse = result.choices[0].text.trim(); // Extrahera och visa endast AI-svaret
            setConversation({ question: query, answer: aiResponse });
            setDisplayedAnswer(''); // Rensa tidigare svar
            setQuery(''); // Töm inputfältet när frågan skickats
        } catch (error) {
            setConversation({ question: query, answer: 'Ett fel uppstod vid hämtning av data från OpenAI.' });
            setDisplayedAnswer(''); // Rensa tidigare svar
        }
    };

    useEffect(() => {
        if (conversation && conversation.answer) {
            const delayBeforeShowingAnswer = 2000; // 2 sekunders fördröjning

            const timeoutId = window.setTimeout(() => {
                setDisplayedAnswer(conversation.answer);
            }, delayBeforeShowingAnswer);

            return () => clearTimeout(timeoutId);
        }
    }, [conversation]);

    

    return (
        <div className="ai-component">
            <form onSubmit={handleSubmit}>
                <label htmlFor="query">Fråga:</label>
                <input
                    id="query"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Skriv din fråga här"
                />
                <button type="submit">Skicka</button>
            </form>
            <div className="response">
                {conversation && (
                    <div>
                        <p><strong>Fråga:</strong> {conversation.question}</p>
                        <p><strong>Svar:</strong> <span className="typing">{displayedAnswer}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OpenAIComponent;
