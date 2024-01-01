import React from "react";
import Post from "./components/Post";
import { connect } from "react-redux";
import { Component } from "react";
import { Container, Header, Button, Item, Segment } from "semantic-ui-react";
import GER from './containers/GER.json';
import USA from './containers/USA.json'; //там ведь не текст
import JAP from './containers/JAP.json';
import CHI from './containers/CHI.json';
import POL from './containers/POL.json';

class App extends Component{

fetchPosts() //Через локальный файл result.json
{
  const { setPosts } = this.props;
  setPosts([]);
}

componentWillMount() {
  this.fetchPosts();
}

regionText (s) {
  switch(s) {
    case 'USA':
      return 'США';
    case 'GER':
      return 'Германия';
    case 'JAP':
      return 'Япония';
    case 'CHI':
      return 'Китай';
    case 'POL':
      return 'Польша';
    default:
  }
}

render()
{
  const { posts } = this.props;
  return (
    <Container>
      <center>
         <h1 class="ui header blue">
            Агрегатор новостей
         </h1>
      </center>

      <Header as="h2">Регион: { this.regionText(this.props.regions.region)}</Header>

      <Button.Group floated='left'>
      <Button onClick= {() => {this.props.changeRegion('USA'); this.props.setPosts(USA)}}>США</Button>
      <Button onClick={() => {this.props.changeRegion('GER'); this.props.setPosts(GER)}}>Германия</Button>
      <Button onClick={() => {this.props.changeRegion('JAP'); this.props.setPosts(JAP)}}>Япония</Button>
      <Button onClick={() => {this.props.changeRegion('CHI'); this.props.setPosts(CHI)}}>Китай</Button>
      <Button onClick={() => {this.props.changeRegion('POL'); this.props.setPosts(POL)}}>Польша</Button>
      </Button.Group>
      <br></br>
      <br></br>
      <Item.Group divided>
      {
        !posts.items.length ? (<Segment >
          <h1  >Выберите страну из списка выше</h1>
        </Segment>): 
        posts.items.map((item, key) => (
          <Post
            key={key}
            {...item}
          />
        ))
      }
      </Item.Group>
    </Container>
  );
}
}
const state = props => {
  console.log(props);
  return {
    ...props,
  };
};

const actions = dispatch => ({
  setPosts: data =>
    dispatch({
      type: 'SET_POSTS',
      payload: data,
    }),
  changeRegion: name =>
    dispatch({
      type: 'CHANGE_REGION',
      payload: name,
    }),
});

export default connect(state, actions)(App);

/*

  <Button.Group floated='left'>
      <Button onClick= {() => {this.props.changeRegion('USA'); this.props.setPosts(USA)}}>США</Button>
      <Button onClick={() => {this.props.changeRegion('GER'); this.props.setPosts(GER);}}>Германия</Button>
      <Button onClick={() => {this.props.changeRegion('JAP'); this.props.setPosts(JAP)}}>Япония</Button>
      <Button onClick={() => {this.props.changeRegion('CHI'); this.props.setPosts(CHI)}}>Китай</Button>
      <Button onClick={() => {this.props.changeRegion('POL'); this.props.setPosts(POL)}}>Польша</Button>
      </Button.Group>



*/




/*
<button onClick={this.fetchPosts.bind(this)}>Получить записи</button>
*/


/*
<div>
      
      <ul>
        <li>
          <button onClick={() => this.props.changeRegion('USA')}>США</button>
        </li>
        <li>
          <button onClick={() => this.props.changeRegion('ENG')}>Великобритания</button>
        </li>
        <li>
          <button onClick={() => this.props.changeRegion('JAP')}>Япония</button>
        </li>
      </ul>

      </div>
*/