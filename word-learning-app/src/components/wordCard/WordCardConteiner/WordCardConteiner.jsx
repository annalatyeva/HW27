import './WordCardConteiner.css';

import {useState} from 'react';
import { Words } from '../../Words.js';

import ArrowButton from '../ArrowButton/ArrowButton.jsx';
import WordCard from '../WordCard/WordCard.jsx';

let previousButton = require("../../../assets/previous-button.png");
let nextButton = require("../../../assets/next-button.png");
let disabledPreviousButton = require("../../../assets/disabled-previous-button.png");


function WordCardConteiner () {

  const [translated, setTranslate] = useState(false);
  const [translatedCount, setTranslatedCount] = useState(0);
  const [translatedWords, setTranslatedWords] = useState(() => ({}));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleNext = () => {
        if (currentIndex < Words.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setTranslate(false);
        } else {
          setIsFinished(true);
        }
      };
    
      const handleRestart = () => {
        setCurrentIndex(0);
        setIsFinished(false);
        setTranslate(false);
        setTranslatedCount(0);
        setTranslatedWords({});
      };
    
      const handlePrevious = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setTranslate(false);
        }
      };

      const showTranslate = () => {
        setTranslate(!translated);
        setTranslatedCount(translatedCount + 1);
        console.log(translatedWords);
        setTranslatedWords(prevState  => ({
          ...prevState,
          [currentIndex]: true
        }));
        console.log(translatedWords);
    };



    return (
    <div className='WordCardConteiner'>
        {isFinished
        ? <></>
        :
        <ArrowButton
        image={currentIndex === 0 ? disabledPreviousButton : previousButton}
        disabled={currentIndex === 0}
        onClick={handlePrevious}
        />
        }
        <WordCard
        isFinished={isFinished}
        tags={Words[currentIndex].tags}
        english={Words[currentIndex].english}
        transcription={Words[currentIndex].transcription}
        translated={translated}
        russian={Words[currentIndex].russian}
        showTranslate={showTranslate}
        handleRestart={handleRestart}
        />
        
        {isFinished
        ? <></>
        :
        <ArrowButton image={nextButton} onClick={handleNext}/>}
        <div>Слов изучено: {translatedCount}</div>
    </div>
    );
}

export default WordCardConteiner;