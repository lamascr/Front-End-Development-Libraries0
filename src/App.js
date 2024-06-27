import React, { useState, useEffect } from 'react';
import QuoteBox from './components/QuoteBox';
import './styles/App.css';

function App() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [textColor, setTextColor] = useState('#FFFFFF');

  const images = [
    'https://cdn.pixabay.com/photo/2020/09/27/03/38/woman-5605529_640.jpg',
    'https://cdn.pixabay.com/photo/2020/02/11/23/00/explore-4841170_1280.jpg',
    'https://cdn.pixabay.com/photo/2024/05/27/13/34/door-8791308_1280.jpg',
    'https://cdn.pixabay.com/photo/2020/04/22/12/06/adventure-5077760_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/08/01/08/07/sea-2563389_1280.jpg'
  ];

  const fetchBackgroundImage = () => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBackgroundImage(randomImage);
  };

  useEffect(() => {
    fetchBackgroundImage();
  }, []);

  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = backgroundImage;

      img.onload = () => {
        // Crear un canvas y dibujar la imagen
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Obtener los datos de los píxeles de la imagen
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let r = 0, g = 0, b = 0, count = 0;

        // Calcular el brillo promedio
        for (let i = 0; i < pixels.length; i += 4) {
          r += pixels[i];
          g += pixels[i + 1];
          b += pixels[i + 2];
          count++;
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Si la luminancia es alta, usar texto oscuro, si no, usar texto claro
        setTextColor(luminance > 0.5 ? '#000000' : '#FFFFFF');
      };
    }
  }, [backgroundImage]);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, color: textColor }}>
      <QuoteBox onNewQuote={fetchBackgroundImage} />
    </div>
  );
}

export default App;
