import React from 'react';
import './App.css';
import { fabric } from 'fabric';
import { Button } from 'reactstrap';
//import _ from 'lodash';

class App extends React.Component {
  state = { frames: [], noOfFrames: 0, noFrame: false, canvasRotation: true }

  componentDidMount(){
    this.canvas = new fabric.Canvas('c');
}

  addRect = () => {
    function pad(str, length) {
      while (str.length < length) {
        str = '0' + str;
      }
      return str;
    }
  
    var getRandomInt = fabric.util.getRandomInt;
    function getRandomColor() {
      return (
        pad(getRandomInt(0, 255).toString(16), 2) + pad(getRandomInt(0, 255).toString(16), 2) + pad(getRandomInt(0, 255).toString(16), 2)
      );
    }
   
    var rect = new fabric.Rect({
      left: getRandomInt(0, 550),
      top: getRandomInt(0, 250),
      fill: '#' + getRandomColor(),
      width: 50,
      height: 50,
      opacity: 0.8
    });
    this.canvas.add(rect);
    this.setState({ noFrame : true });
  }

  newFrame = () => {
    var json = JSON.parse(JSON.stringify(this.canvas.toJSON()));
    this.setState({
      frames: [...this.state.frames, json.objects],
      noOfFrames : this.state.noOfFrames + 1
    }); 
  }

  frameFilter = (frameIndex) => {
    var clickedFrame = this.state.frames[frameIndex-1];
    this.canvas.clear();
    let canvasData = JSON.stringify({objects : clickedFrame})
    this.canvas.loadFromJSON(canvasData, this.canvas.renderAll.bind(this.canvas));
  }

  rotate = () => {
      var a = document.getElementById('canvas-parent');
      if(this.state.canvasRotation){
        a.classList.add('rotation');
        this.setState({
          canvasRotation: !this.state.canvasRotation,
        })
      }
      else{
        a.classList.remove('rotation');
        this.setState({
          canvasRotation: !this.state.canvasRotation,
        })
      }

    }

  clear = () => {
    this.canvas.clear();
    this.setState({ frames: [], noOfFrames: 0, noFrame: false });
  }

  render(){
    const { noOfFrames } = this.state;
    return (
        <div className="container m-3" id='canvas-parent'> 
            <canvas id="c" width="600" height="300" />
            <div className="d-flex justify-content-center mt-3">
              <Button color="primary" onClick={this.addRect}>Add Object</Button>
              <Button color="success" onClick={this.newFrame} className="ml-2" disabled={!this.state.noFrame}>New Frame</Button>
              <Button color="danger" onClick={this.clear} className="ml-2" disabled={!this.state.noFrame}>Clear Canvas</Button>
              <Button color="info" onClick={this.rotate} className="rotate ml-2">Rotate Canvas</Button>
            </div>
            <h5 className="text-center mt-3">No. of frames saved: {noOfFrames}</h5>
            <div className="d-flex justify-content-center flex-wrap">
              {this.state.frames.map((frame, i) => {
                  return <Button 
                          key={`frame`+i} 
                          className="ml-3 mt-3" 
                          onClick={() => this.frameFilter(i+1)}>
                            Frame : {(i + 1)}
                            </Button>
                      })}
            </div>
        </div>
    );
  }
}

export default App;