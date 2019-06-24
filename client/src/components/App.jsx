import React from 'react';
import path from 'path';
import axios from 'axios';


// import AttendeeForm from './AttendeeForm.jsx';
// import AttendeeList from './AttendeeList.jsx';
function rect(props) {
  const { ctx, x, y, width, height } = props;
  ctx.fillRect(x, y, width, height);
}
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      colorpalettes: [],
      selectedFile: null,
    };
    // this.addAttendee = this.addAttendee.bind(this);
    // this.getAttendees = this.getAttendees.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }

  componentDidMount() {
  }

  fileChangedHandler(e) {
    this.setState({ selectedFile: e.target.files[0] })
  }

  uploadHandler() {
    const data = new FormData();
    data.append("image", this.state.selectedFile, this.state.selectedFile.name);

    return axios.post('http://localhost:3010/' + 'uploadedimage', data)
      .then(response => {
        console.log(response)
        this.updateCanvas(response.data.imageUrl)})

  }

  updateCanvas(url) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = 'http://localhost:3010/'+ url;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 640, 425);
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

  render() {
    return (
      <div className="main">
        <div className="rightCol">
          <h2>My Swatches</h2>
          {/* < ColorPaletteList /> */}
        </div>
        <div className="leftCol">
          <h2>Color Picker</h2>
          <h5>1. Upload an image.</h5>
          <h5>2. Choose 5 colors then click save.</h5>
          <input type="file" onChange={this.fileChangedHandler}></input>
          <button onClick={this.uploadHandler}>Upload!</button>
          <canvas ref="canvas" width={640} height={425}/>
          {/* < ColorPalettePicker /> */}
        </div>
      </div>
    );
  }
}

export default App;


// TODO render an image
// TODO make sure upload is saving
// TODO render uploaded image
// TODO add color picker
// TODO add react to color picker
// TODO save color palette
// TODO show color palettes in db
// TODO show color in multiple formats