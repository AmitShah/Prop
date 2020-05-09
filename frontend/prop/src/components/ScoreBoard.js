import React from "react";
import { render } from "react-dom";
import posed, { PoseGroup } from "react-pose";

const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};


// const Container = styled.div`
//   margin-top: 10vh;
//   height: 80vh;
//   display: flex;
//   overflow:scroll
// `;

const Item = posed.li({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

// const StyledItem = styled(Item)`
//   padding: 15px;
//   list-style-type: none;
//   margin: 5px 0px 5px 0px;
//   border: 1px solid #e3e3e3;
// `;

const ItemList = ({ items }) => (
  <ul>
    <PoseGroup>
      {items.map(item => (
        <Item key={item.id} className="ScoreBoard Item">{item.text} </Item>
      ))}
    </PoseGroup>
  </ul>
);

class ScoreBoard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: [
        { id: 1, text: "React" },
        { id: 2, text: "Javascript" },
        { id: 3, text: "Programming" },
        { id: 4, text: "Animations" }
      ],
      count: 4
    };
    this._shuffle = this._shuffle.bind(this);
  }

  _shuffle() {
    var count = this.state.count;
    count++;
    var items = this.state.items.slice();
    items.push({
      id: count,
      text: Math.random().toString()
    });
    //this.setState({ items: items, count: count });
    this.setState({ items: shuffle(this.state.items) });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(this._shuffle, 2000);

    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat([{ id: 5, text: "See how I fade in?" }])
    //   });
    // }, 3000);

    // setTimeout(() => {
    //   this.setState({
    //     items: [{ id: 6, text: "Can also fade in on top" }].concat(
    //       this.state.items
    //     )
    //   });
    // }, 6000);
  }

  render() {
    return (
      <div>
   
        <ItemList items={this.state.items}  />
     
      </div>
    );
  }
}


export default ScoreBoard;
