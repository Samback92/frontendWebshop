import React, { useState } from 'react';

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
    const [response, setResponse] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await fetchFromOpenAI(query);
            const aiResponse = result.choices[0].text.trim(); // Extrahera och visa endast AI-svaret
            setResponse(aiResponse);
            setQuery(''); // Töm inputfältet när frågan skickats
        } catch (error) {
            setResponse('Ett fel uppstod vid hämtning av data från OpenAI.');
        }
    };


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
            <div>
                <pre>{response}</pre> {/* Visa endast det extraherade svaret */}
            </div>
        </div>
    );
};

export default OpenAIComponent;