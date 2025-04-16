import React, { useState, useEffect } from 'react';

export default function VisualStorytelling() {
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [summary, setSummary] = useState('');
    const [isSummarized, setIsSummarized] = useState(false);

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!image || !prompt) return;
        setIsGenerating(true);
        setGeneratedText('');
        setDisplayedText('');
        setSummary('');
        setIsSummarized(false);

        const formData = new FormData();
        formData.append('image', image);
        formData.append('prompt', prompt);

        try {
            const response = await fetch('http://localhost:5000/generate-story', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to generate story');
            }

            const data = await response.json();
            setGeneratedText(data.story);
            setSummary(data.summary);
        } catch (error) {
            console.error('Error:', error);
            setGeneratedText('An error occurred while generating the story.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSummarize = () => {
        setIsSummarized(true);
        setGeneratedText(summary);
        setDisplayedText('');
    };

    useEffect(() => {
        if (!isGenerating && generatedText) {
            const words = generatedText.split(' ');
            let currentText = '';
            let index = 0;

            const interval = setInterval(() => {
                if (index >= words.length) {
                    clearInterval(interval);
                    return;
                }
                const chunkSize = Math.random() < 0.5 ? 2 : 3;
                const chunk = words.slice(index, index + chunkSize).join(' ');
                currentText = currentText ? `${currentText} ${chunk}` : chunk;
                setDisplayedText(currentText);
                index += chunkSize;
            }, 500);

            return () => clearInterval(interval);
        }
    }, [isGenerating, generatedText]);

    // Styles
    const canvasStyle = {
        width: '1920px',
        height: '1080px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f1d6',
        margin: '0',
        padding: '0',
        position: 'fixed',
        top: '0',
        left: '0',
    };

    const imageAreaStyle = {
        width: '320px',
        height: '360px',
        border: '2px solid #5b3b2a',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginBottom: '30px',
    };

    const promptInputStyle = {
        border: '2px solid #5b3b2a',
        borderRadius: '12px',
        padding: '10px',
        marginBottom: '20px',
        width: '750px',
        backgroundColor: '#f5f1d6',
        color: '#4a4a4a',
        fontSize: '20px',
    };

    const buttonStyle = {
        backgroundColor: '#5b3b2a',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        width: '250px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '20px',
    };

    const storyOuterContainerStyle = {
        width: '1820px',
        height: '980px',
        border: '2px solid #5b3b2a',
        borderRadius: '12px',
        backgroundColor: '#f5f1d6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative', // Allows absolute positioning of children
    };

    const storyInnerContainerStyle = {
        width: '800px',
        height: '100%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between', // Distributes space between text and button
        overflowY: 'auto',
    };

    const storyTextStyle = {
        fontSize: '24px',
        color: '#4a4a4a',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        maxWidth: '100%',
        flexGrow: 1, // Allows text to take available space
        display: 'flex',
        alignItems: 'center', // Centers text vertically within its space
    };

    const buttonContainerStyle = {
        position: 'absolute',
        bottom: '30px', // Keeps it above the bottom border (20px padding + 10px extra)
        left: '50%',
        transform: 'translateX(-50%)', // Centers horizontally
    };

    const generatingStyle = {
        fontSize: '30px',
        color: '#4a4a4a',
        animation: 'fadeInOut 1.5s infinite',
    };

    const hiddenInputStyle = {
        display: 'none',
    };

    return (
        <div style={canvasStyle}>
            {!generatedText && !isGenerating ? (
                <>
                    <label style={imageAreaStyle}>
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Uploaded"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                            />
                        ) : (
                            <span style={{ color: '#4a4a4a', fontSize: '24px' }}>Image Here</span>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={hiddenInputStyle}
                        />
                    </label>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your prompt"
                        style={promptInputStyle}
                    />
                    <button onClick={handleSubmit} style={buttonStyle}>
                        Generate Story
                    </button>
                </>
            ) : (
                <>
                    {isGenerating ? (
                        <span style={generatingStyle}>Generating...</span>
                    ) : (
                        <div style={storyOuterContainerStyle}>
                            <div style={storyInnerContainerStyle}>
                                <span style={storyTextStyle}>{displayedText}</span>
                                {!isSummarized && (
                                    <div style={buttonContainerStyle}>
                                        <button onClick={handleSummarize} style={buttonStyle}>
                                            Summarize
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
            <style>
                {`
                    @keyframes fadeInOut {
                        0% { opacity: 0; }
                        50% { opacity: 1; }
                        100% { opacity: 0; }
                    }
                `}
            </style>
        </div>
    );
}