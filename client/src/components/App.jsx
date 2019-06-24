import React from 'react';

import axios from 'axios';

// import AttendeeForm from './AttendeeForm.jsx';
// import AttendeeList from './AttendeeList.jsx';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      colorpalettes: [],
    };
    // this.addAttendee = this.addAttendee.bind(this);
    // this.getAttendees = this.getAttendees.bind(this);
  }

  componentDidMount() {
    // this.getAttendees();
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
          <h5>Choose 5 colors then click save</h5>
          {/* < ColorPalettePicker /> */}
        </div>
      </div>);
  }
}

export default App;
