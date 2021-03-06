var React = require('react');
var ResizableBar = require('react-resizable-bar');

var Demo = (function() {
  "use strict";

  var datastore = {
    percent: 40
  };

  var _styles = {
    resizable: background => ({
      background: background,
      color:      "black",
      textAlign:  "center",
      fontSize:   "12px",
      padding:    "10px",
    }),

    resizableHandle: {
      background: "black",
      position:   "relative",
      margin:     "auto",
      height:     "150%",
      width:      "4px",
      top:        "-25%",
    }
  };

  return React.createClass({
    displayName: "Demo",

    resizableChange: function(val) {
      // hack together a dispatcher and global datastore for the demo
      datastore.percent = Math.floor(val);
      this.forceUpdate();
    },

    getText: function(percent) {
      if (percent == 100) {
        return "You did it!";
      } else if (percent >= 90) {
        return "You are soooo close!";
      } else if (percent >= 80) {
        return "You can do better than this!";
      } else if (percent >= 70) {
        return "Are you even trying?";
      } else if (percent >= 60) {
        return "I know you have it in you!"
      } else if (percent >= 50) {
        return "Can you go all the way?"
      } else if (percent >= 40) {
        return "Play with me!";
      } else if (percent >= 30) {
        return "Wrong way!";
      } else {
        return ":(";
      }
    },

    getHSLColor: function(percent){
        var hue = (percent / 100) * 120;
        return "hsl("+hue+", 80%, 70%)";
    },

    render: function() {
      var percent = datastore.percent;
      var text = this.getText(percent);
      var background = this.getHSLColor(percent);
      var handleRender = (
        <div style={_styles.resizableHandle} />
      );
      return (
        <div>
          <ResizableBar onChange={this.resizableChange}
                     percent={percent}
                     maxPercent={100}
                     minPercent={10}
                     handleChild={handleRender}>
            <div style={_styles.resizable(background)}>{text}</div>
          </ResizableBar>
        </div>
      );
    }
  });
})();

React.render(<Demo />, document.getElementById('app'));
