import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Post from './Post'

class App extends Component {
  constructor(){
    super();
    this.state={
      postVet:[]
    }
  }
  componentDidMount(){
    let state = localStorage.getItem(this.props.storageKey);
    state = JSON.parse(state);
    console.log(state);
    this.setState(state);
  }
  saveInStorage(){
    let actualState = this.state;
    actualState = JSON.stringify(actualState);
    localStorage.setItem('appStorage',actualState);
  }
  criarPost(){
    let vetPost = this.state.postVet;
    let totalPost = this.state.postVet.length;
    totalPost = totalPost + 1;
    vetPost.push(totalPost);
    this.setState({postVet: vetPost});
    this.saveInStorage();
  }
  
  render() {

    return (
      <MuiThemeProvider>
        <div style={{padding: 30, background: '#DDDDDD'}}>
            {this.state.postVet.map((text,index) => {
                return (<Post storageKey={index} text={'Post '+index}/>);
            })}

        </div>
        <RaisedButton primary={true} style={{margin:5}} label={'Criar Post'}onClick={this.criarPost.bind(this)}/>

      </MuiThemeProvider>
    );
  }
}

export default App;
