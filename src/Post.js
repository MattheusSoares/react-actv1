import React, { Component } from 'react';
import {Card, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Post extends Component {
  constructor(){
    super();
    this.state={
      inputText: '',
      name:'Soares',
      likes:0,
      isFavorite: false,
      comments: ['Olá']
    }
  }

  componentDidMount(){
    let state = localStorage.getItem(this.props.storageKey);
    state = JSON.parse(state);
    console.log(state);
    this.setState(state);
  }

  giveLike(){
    let numLikes = this.state.likes;
    numLikes = numLikes + 1;
    const newState = {
      likes: numLikes
    }
    this.setState(newState)
    this.saveInStorage();

  }

  setFavorite(){
    let favorite = this.state.isFavorite;
    favorite = !favorite;
    this.setState({isFavorite: favorite})
    this.saveInStorage();

  }

  newComment(){
    let comments = this.state.comments;
    const newCommentText =this.state.inputText;
    comments.push(newCommentText);
    this.setState({comments: comments,
    inputText:''});
    this.saveInStorage();
  }
  onInputChange(event){
    this.setState({
      inputText: event.target.value
    });
    this.saveInStorage();

  }
  onFormSubmit(event){
    event.preventDefault();
    this.newComment();
    this.saveInStorage();
  }

  saveInStorage(){
    let actualState = this.state;
    actualState = JSON.stringify(actualState);
    localStorage.setItem(this.props.storageKey,actualState);
  }

  render() {
    let favoriteText;
    if(this.state.isFavorite){
      favoriteText = 'Remover dos Favoritos'
    }else{
      favoriteText = 'Favoritar'
    }

    return (
    <Card style={{marginBottom:10}}>
        <CardText>
            <h1>{this.props.text}</h1>
            <h3>{this.state.name}</h3>
            <h4>{'Likes: '+this.state.likes}</h4>
            <RaisedButton primary={true} style={{margin:5}} label={'Like'} onClick={this.giveLike.bind(this)}/>
            <RaisedButton primary={!this.state.isFavorite} secondary={this.state.isFavorite}  style={{margin:5}} label={favoriteText}onClick={this.setFavorite.bind(this)}/>
            <RaisedButton primary={true} style={{margin:5}} label={'Comentar'} onClick={this.newComment.bind(this)}/>
            <form onSubmit={(event)=>{this.onFormSubmit(event)}}>
            <TextField  value={this.state.inputText} onChange={(event)=>{this.onInputChange(event)}} type="text"/>
            
            </form>
            
            <CardText style={{padding: 15}}>
            {this.state.comments.map((text,index) => {
                return (<h4 key={index}> {text} </h4>);
            })}</CardText>

            
        </CardText>
    </Card>

    );
  }
}

export default Post;
