import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { getRandomColor } from './utils';

const App = () => {
  const [canvas, setCanvas] = useState(null);
  const [frames, setFrames] = useState([]);
  const [noOfFrames, setNoOfFrames] = useState(0);

  useEffect(() => {
    setCanvas(new fabric.Canvas('canva'));
  }, []);

  const addRect = () => {
    let getRandomInt = fabric.util.getRandomInt;
   
    let rect = new fabric.Rect({
      left: getRandomInt(0, 550),
      top: getRandomInt(0, 250),
      fill: '#' + getRandomColor(),
      width: 50,
      height: 50,
    });

    canvas.add(rect);
  }

  const newFrame = () => {
    const json = canvas.toJSON();
    setFrames([ ...frames, json.objects ]);
    setNoOfFrames(noOfFrames + 1);
  }

  const frameFilter = (frameIndex) => {
    let clickedFrame = frames[frameIndex-1];
    console.log(`clickedFrame`, clickedFrame)
    let canvasData = JSON.stringify({ objects : clickedFrame });
    canvas.loadFromJSON(canvasData);
  }

  const clear = () => {
    canvas.clear();
    setFrames([]);
    setNoOfFrames(0);
  }

  return (
    <div className="m-3"> 
      <canvas id="canva" width="600" height="300" />
      <div className="mt-3">
        <button onClick={addRect}>Add Object</button>
        <button onClick={newFrame} className="ml-2">New Frame</button>
        <button onClick={clear} className="ml-2">Clear</button>
      </div>
      {frames.length > 0 && (
        <>
          <h5 className="mt-3">No. of frames saved: {noOfFrames}</h5>
          <div>
            {frames.map((_, i) => (
              <button 
                key={`frame-${i}`} 
                className="mt-3" 
                onClick={() => frameFilter(i+1)}>
                  Frame : {(i + 1)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
