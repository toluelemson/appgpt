import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [selectedApp, setSelectedApp] = useState('com.hikingproject.android');
    const [selectedModel, setSelectedModel] = useState('nlptown/bert-base-multilingual-uncased-sentiment');

    const modelOptions = [
        'nlptown/bert-base-multilingual-uncased-sentiment',
        'siebert/sentiment-roberta-large-English',
    ];

    const appOptions = ['com.hikingproject.android'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/reviews?app_id=${selectedApp}&model_name=${selectedModel}`);
                setReviews(response.data.sample_reviews);
            } catch (err) {
                setError("Failed to fetch reviews");
            }
        };

        fetchData();
    }, [selectedApp, selectedModel]);

    return (
        <div className="App">
            <h1>Review Analyzer</h1>

            <div className="selectors">
                <div className="app-selector">
                    <label htmlFor="app-selector">Choose an app: </label>
                    <select
                        id="app-selector"
                        value={selectedApp}
                        onChange={(e) => setSelectedApp(e.target.value)}
                    >
                        {appOptions.map((app) => (
                            <option key={app} value={app}>{app}</option>
                        ))}
                    </select>
                </div>

                <div className="model-selector">
                    <label htmlFor="model-selector">Choose a sentiment model: </label>
                    <select
                        id="model-selector"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    >
                        {modelOptions.map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="reviews-display">
                {error ? (
                    <p>{error}</p>
                ) : (
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index}>
                                <p><strong>{review.userName}</strong>: {review.content}</p>
                                <p>Sentiment: {review.sentiment}</p>
                                <p>Features Mentioned: {review.features.join(', ')}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;
