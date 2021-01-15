import React, { Component } from 'react';
import dragNDrop from './dragNDrop.svg'
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "There is No Image",
      renderImage: false,
      uploadImage: false,
      imgFile: null,
      imgURL: null
    }
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.drop = this.drop.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  onDragEnter(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  drop(event) {
    event.stopPropagation();
    event.preventDefault();
    const dt = event.dataTransfer;
    const file = dt.files[0];
    const imgURL = window.URL.createObjectURL(file);
    this.setState(
      {
        imgFile: file,
        imgURL:imgURL,
        title: file.name.split('.')[0],
        renderImage: true,
        uploadImage: false
      })

    console.log(file);
  }

  uploadImage() {
    let formData = new FormData();
    formData.append("image", this.state.imgFile);
    console.log(formData.getAll('image')[0]);
    this.setState(
      { 
        uploadImage:true
      });
    if(this.state.renderImage){
      axios({
        url: "http://localhost:3001/api",
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 5000
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h1>{this.state.title}</h1>
          <form className="form_0" 
              method="post" 
              action="http://localhost:3001/" 
              encType="multipart/form-data"
              >
          <div className="form_1" onDragEnter={this.onDragEnter} 
              onDragOver={this.onDragOver} onDrop={this.drop}>

            {this.state.renderImage ?
            <div className="form_image">
              <img src={this.state.imgURL} 
              alt={this.state.title}
              onLoad={()=>{
                window.URL.revokeObjectURL(this.state.url)
              }} 
              style={
                {
                  maxWidth: "490px",
                  maxHeight: "520px"
                }
              }></img>
            </div> :

              <div className="form_2">
              <img src={dragNDrop} alt="dranNdrop"></img>
              <div className="message">
                <input type="file" id="file"></input>
                <label style={{cursor:"pointer"}} htmlFor="file"><strong>Choose your image </strong></label>
                <span>or Drag and Drop</span>
              </div>
            </div>
            }

          </div>
          {this.state.uploadImage ? 
            <div className="uploadMessage">
              Success Uploading!
            </div> :
            this.state.renderImage ? 
              <ul className="uploadList">
                <li className="uploadElement">{this.state.imgFile.name}</li>
              </ul> :
              null
          }
        </form>
        <button className="upload_btn" onClick={this.uploadImage}>Upload</button>
      </div>
    )
  }
}

export default App;
