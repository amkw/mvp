import React from 'react';
import axios from 'axios';
import PickedColors from './PickedColors.jsx';


class App extends React.Component {

  constructor() {
    super();
    let ctx;
    this.state = {
      colorpalettes: [],
      selectedFile: null,
      pickedColors: ['#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8','#E8E8E8'],
      counter: 0
    };
    // this.addAttendee = this.addAttendee.bind(this);
    // this.getAttendees = this.getAttendees.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.selectColor = this.selectColor.bind(this);
  }

  componentDidMount() {
    this.getPalettes();
  }

  fileChangedHandler(e) {
    this.setState({ selectedFile: e.target.files[0] })
  }

  uploadHandler() {
    const data = new FormData();
    data.append("image", this.state.selectedFile, this.state.selectedFile.name);

    return axios.post('http://localhost:3010/' + 'uploadedimage', data)
      .then(response => {
        this.updateCanvas(response.data.imageUrl)})

  }

  updateCanvas(url) {
    const canvas = this.refs.canvas;
    this.ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = 'http://localhost:3010/'+ url;
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0, 640, 425);
      }
  }

  selectColor(e) {
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;
    let imageData = this.ctx.getImageData(x, y, 1, 1).data;
    let rgbColor = 'rgb(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ')';
    if (this.state.counter < 5) {
      let allColors = this.state.pickedColors;
      allColors[this.state.counter] = rgbColor;
      // console.log('counter', this.state.counter)
      // console.log('pickedColors', this.state.pickedColors)
      this.setState({
        pickedColors: allColors,
        counter: this.state.counter+1
      });
    } else {
      this.savePalette();
      this.setState({
        pickedColors: ['#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8'],
        counter: 0
      });
    }
  }

  // getAttendees() {
  //   axios.get('/colorpalettes')
  //     .then(res => {
  //       this.setState({
  //         colorpalettes: res.data,
  //       });
  //     });
  // }

  // addAttendee(colorpalettes) {
  //   axios.post('/colorpalettes', colorpalettes)
  //     .then(() => {
  //       this.getAttendees();
  //     });
  // }
  savePalette() {
    axios.post('/colorpalettes', this.state.pickedColors)
      .then((res) => {
        console.log('Post Paletter:',res);
        this.getPalettes();
      });
  };

  getPalettes() {
    axios.get('/colorpalettes')
      .then((res) => {
        let palettes = res.data.map((record) => {
          // console.log('record :', record);
          let colorArr = [];
          delete record._id;
          delete record.__v;
          Object.keys(record).forEach((color) => colorArr.push(record[color]));
          // console.log('colorArr', colorArr)
          return colorArr;
        });
        let reversed = palettes.reverse();
        this.setState({ colorpalettes: reversed });
        // console.log('Get Palettes:', palettes);
      })
  }

  render() {
    let colorPalettes = this.state.colorpalettes.map((palette, index) => {
      return (<PickedColors colors={palette}/>);
    });

    return (
      <div className="main">
        <div className="rightCol">
          <h2>My Swatches</h2>
          <div>
            {colorPalettes}
          </div>
        </div>
        <div className="leftCol">
          <h2>Color Picker</h2>
          <h5>1. Upload an image.</h5>
          <h5>2. Click to choose 5 colors from the image.</h5>
          <input type="file" onChange={this.fileChangedHandler}></input>
          <button onClick={this.uploadHandler}>Upload!</button>
          <canvas ref="canvas" width={640} height={425} onMouseDown={this.selectColor}/>
          < PickedColors colors={this.state.pickedColors}/>
        </div>
      </div>
    );
  }
}

export default App;


// TODO save color palette
// TODO show color palettes in db
// TODO show color in multiple formats