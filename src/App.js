import React, { useEffect, useState } from 'react';
import './style.css';
import FadeIn from 'react-fade-in';
import Typing from 'react-typing-animation';

export default function App() {
  let [loading, setLoading] = useState(false);
  let [article, setArticle] = useState(false);
  let [search, setSearch] = useState('');
  let [image, setImage] = useState('');
  let [title, setTitle] = useState('');
  useEffect(() => {
    search && setLoading(true);
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${search}`)
      .then(data => data.json())
      .then(data => {
        setTitle(data.title);
        setArticle(data.extract);
        setImage(data.originalimage.source);
      });
    setLoading(false);
  }, [search]);

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh'
      }}
    >
      <div style={{ margin: '10%' }}>
        <h1>Wikipedia Explorer</h1>
        <input
          style={{ width: '90%' }}
          type="text"
          onChange={el => setSearch(el.target.value)}
        />
        {loading && <p> Loading... </p>}

        {article && (
        <>  
          <FadeIn delay= "200" transitionDuration= "600" >
          
          <h3> {title} </h3> 
            <div
              style={{
                padding: '1%',
                margin: '1%'
              }}
            >
              {image && (
                <img style={{ width: '12rem', height: '8rem' }} src={image} />
              )}
            </div>
            <p
              style={{
                maxWidth: '40ch',
                textAlign: 'justify',
                textJustify: 'inter-word'
              }}
            >
              {article}
            </p>
            </FadeIn>
          </>
        )}
      </div>
    </section>
  );
}
