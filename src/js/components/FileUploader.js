import React from "react";
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class FileUploader extends React.Component {
    constructor(){
        super();
        this.state = {
            droped: false,
            uploading: false,
            uploaded: false,
            file: undefined,
            uploadedFile: "",
            percentCompleted: 0,
            outputMessage: ""
        }
        this.onDrop = this.onDrop.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    onDrop(file){
        this.setState({
            ...this.state,
            droped: true,
            uploading: false,
            outputMessage: "",
            file
        });
    }

    onDropRejected(){
        this.setState({
            ...this.state,
            droped: false,
            outputMessage: "Maximum file upload size is 4MB"
        });
    }

    onUpload(e){
        e.preventDefault();
        
        if(Array.isArray(this.state.file)){
            e.stopPropagation();

            //change state for showing progress bar
            this.setState({
                ...this.state,
                uploading: true    
            });

            const f = this.state.file[0];
            const formFile = new FormData();
            formFile.append('uploadfile', f, f.name);

            //server upload progress url
            const file_url = document.location.origin+"/bose4/server/ajax-file-upload.php";
            // const file_url = "/server/ajax-file-upload.php";
            const config = {
                onUploadProgress: (progressEvent) => {
                    let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.setState({
                        ...this.state,
                        percentCompleted: percent
                    })
                }
            };

            axios.post(file_url, formFile, config)
                .then(res => {
                    console.log(res);
                    this.props.doneUpdate(this.props.keyid, res.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
        
    }

    render(){
        let progressWidth = {
            width: this.state.percentCompleted+"%"
        };
            
        return (
            <div id= {"file-upload-zone-"+this.props.keyid } className={ "file-upload-zone "+(this.state.uploading? "uploading" :(this.state.droped?"droped":"waiting"))}>
                <Dropzone className="file-upload-area" accept="image/jpeg, image/png, application/pdf" maxSize={5097152} 
                onDrop={this.onDrop} 
                onDropRejected={this.onDropRejected}>
                    <div className="box__input">
                        <div className="box__input-text">{ this.state.droped? (Array.isArray(this.state.file)? this.state.file[0].name : ""): "Upload pdf or image (any format)"}</div>
                        <a href="#" className="upload-btn" onClick={ (e) => { this.onUpload(e) } }>UPLOAD</a>
                    </div>
                    <div className="progress-wrp">
                        <div className="progress-bar" style={ progressWidth }></div>
                        <div className="status">{ this.state.percentCompleted }%</div>
                    </div>
                    <div className="output">{ this.state.outputMessage }</div>
                </Dropzone>
            </div>
        );
    }
}
