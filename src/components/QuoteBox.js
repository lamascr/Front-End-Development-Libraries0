import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuoteBox.css';

const QuoteBox = ({ onNewQuote }) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
      onNewQuote();
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(quote)}" - ${encodeURIComponent(author)}`;
    window.open(tweetUrl, '_blank');
  };
// en esta line no consigo que el codigo publique el texto en linkedin 
  const shareLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Inspirational Quote')}&summary=${encodeURIComponent(quote + ' - ' + author)}&source=${encodeURIComponent(window.location.href)}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div id="quote-box" className="quote-box">
      <p id="text">{quote}</p>
      <p id="author">- {author}</p>
      <button id="new-quote" onClick={fetchQuote}>New Idea</button>
      <button id="tweet-quote" onClick={tweetQuote}>Tweet</button>
      <button id="linkedin-share" onClick={shareLinkedIn}>LinkedIn</button>
    </div>
  );
};

export default QuoteBox;
