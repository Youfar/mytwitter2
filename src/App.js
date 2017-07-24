import React, { Component } from 'react';
import TimeLine from "./timeline/container/TimeLine";

class App extends Component {
  render() {
      const { token } = this.props;
    return (
    <div>
        {(() => {
            if(token !== null) {
                return (<div>
                    <TimeLine/>
                </div>)
            } else {
                return <h1>You are not logged in</h1>
            }
        })()}
    </div>
    );
  }
}

export default App;
