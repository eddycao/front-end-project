import React, { useEffect, useState } from 'react';
import { list, getUrl } from 'aws-amplify/storage';

function Gallery() {
  const [imageURLs, setImageURLs] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const MAX_VISIBLE = 5;

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      // list objects
      const { items } = await list({
        path: 'images/',
        options: { listAll: true }
      });

      // filter out non-image
      const imageItems = items.filter(item => {
        // simple extension check
        const path = item.path.toLowerCase();
        return path.endsWith('.jpg') || path.endsWith('.jpeg') ||
               path.endsWith('.png') || path.endsWith('.gif');
      });

      // map to actual signed URL
      const results = await Promise.all(
        imageItems.map(async (f) => {
          const { url } = await getUrl({ path: f.path });
          return url;
        })
      );

      setImageURLs(results);
    } catch (err) {
      console.error('Error listing/fetching images from S3:', err);
    }
  }

  const totalImages = imageURLs.length;
  if (totalImages === 0) {
    return (
      <div style={{ marginTop: '20px', textAlign: 'center', backgroundColor: '#E3FDF7', borderRadius: '8px', padding: '20px' }}>
        <h3 style={{ marginBottom: '8px', color: '#444' }}>Eco-Friendly Gallery</h3>
        <p style={{ color: '#666' }}>No images found in S3.</p>
      </div>
    );
  }

  function getWindowedImages() {
    const arr = [];
    for (let i = 0; i < Math.min(MAX_VISIBLE, totalImages); i++) {
      const idx = (startIndex + i) % totalImages;
      arr.push(imageURLs[idx]);
    }
    return arr;
  }

  const displayed = getWindowedImages();

  const handleNext = () => {
    if (totalImages > MAX_VISIBLE) {
      setStartIndex(prev => (prev + 1) % totalImages);
    }
  };

  const handlePrev = () => {
    if (totalImages > MAX_VISIBLE) {
      setStartIndex(prev => (prev - 1 + totalImages) % totalImages);
    }
  };

  // same logic for partial-dist
  function getImageStyle(i) {
    const style = {
      position: 'absolute',
      transition: 'transform 0.7s ease, opacity 0.7s ease',
      width: '280px',
      height: '350px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      zIndex: 0,
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      objectFit: 'cover'
    };

    if (i === 2) {
      style.opacity = 1;
      style.zIndex = 5;
      style.transform = 'translate(-50%, -50%) scale(1)';
    } else if (i === 1) {
      style.opacity = 0.8;
      style.zIndex = 4;
      style.transform = 'translate(-130%, -50%) scale(0.85)';
    } else if (i === 0) {
      style.opacity = 0.6;
      style.zIndex = 3;
      style.transform = 'translate(-200%, -50%) scale(0.7)';
    } else if (i === 3) {
      style.opacity = 0.8;
      style.zIndex = 4;
      style.transform = 'translate(30%, -50%) scale(0.85)';
    } else if (i === 4) {
      style.opacity = 0.6;
      style.zIndex = 3;
      style.transform = 'translate(100%, -50%) scale(0.7)';
    }
    return style;
  }

  const outerWrapper = {
    width: '80%',
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: '#E3FDF7',
    padding: '24px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  };

  const containerStyle = {
    position: 'relative',
    width: '1200px',
    height: '400px',
    margin: '0 auto',
    overflow: 'hidden',
    backgroundColor: '#FAFFFC',
    border: '2px solid #C7F0DB',
    borderRadius: '12px'
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '28px',
    background: 'rgba(255,255,255,0.8)',
    color: '#999',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: (totalImages > MAX_VISIBLE) ? 'pointer' : 'default',
    userSelect: 'none',
    zIndex: 10
  };

  const leftArrowStyle = {
    ...arrowStyle,
    left: '10px'
  };

  const rightArrowStyle = {
    ...arrowStyle,
    right: '10px'
  };

  return (
    <div style={outerWrapper}>
      <h3 style={{ marginBottom: '8px', color: '#444' }}>Eco-Friendly Gallery</h3>
      <p style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
        Showing at most five images with center focus and partial side previews. Click arrows to slide through more.
      </p>

      <div style={containerStyle}>
        <div
          style={leftArrowStyle}
          onClick={handlePrev}
        >
          &#9664;
        </div>

        {displayed.map((url, i) => {
          const imgStyle = getImageStyle(i); 
          return (
            <img 
              key={`${url}-${i}`}
              src={url}
              alt="eco"
              style={imgStyle}
            />
          );
        })}

        <div
          style={rightArrowStyle}
          onClick={handleNext}
        >
          &#9654;
        </div>
      </div>
    </div>
  );
}

export default Gallery;
