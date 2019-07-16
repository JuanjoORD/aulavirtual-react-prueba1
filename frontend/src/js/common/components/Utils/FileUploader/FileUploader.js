import React,  {Component} from "react";
import './FileUploader.css'

const defaultProps = {
    baseColor: 'gray',
    activeColor: 'green',
    overlayColor: 'rgba(255,255,255,0.3)',
    opacity:0
};

class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            imageSrc: '',
            loaded: false
        };

        this.onDragEnter  = this.onDragEnter.bind(this);
        this.onDragLeave  = this.onDragLeave.bind(this);
        this.onDrop       = this.onDrop.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    componentDidUpdate() {
        if (this.state.imageSrc === '' && this.props.source !== undefined && this.props.source !== null) {
            this.setState({imageSrc: this.props.source, loaded: true})
        }
    }

    componentWillMount(){
        if (this.props.img !== null && this.props.img !== undefined){
            // setea la imágen si se le envia una
            this.setState({
                imageSrc: this.props.img,
                loaded: true,
                isImage: true,
            });
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.img !== null && nextProps.img !== undefined){
            // setea la imágen si se le envia una
            this.setState({
                imageSrc: nextProps.img,
                loaded: true
            });
        }
    }

    onDragEnter(e) {
        this.setState({ active: true });
    }

    onDragLeave(e) {
        this.setState({ active: false });
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop(e) {
        e.preventDefault();
        this.setState({ active: false });
        this.onFileChange(e, e.dataTransfer.files[0]);
    }

    onFileChange(e, file) {
        this.props.onFileChange(e, file);
        file = file || e.target.files[0];
        const pattern = /-*/;
        const imagePattern = /image-*/;

        const reader = new FileReader();
        if (file){
            const isImage = !!file.type.match(imagePattern);
            if (!file.type.match(pattern)) {
                alert('Formato inválido');
                return;
            }

            this.setState({ loaded: false });

            reader.onload = (e) => {
                this.setState({
                    imageSrc: reader.result,
                    isImage,
                    loaded: true
                });
            };
            reader.readAsDataURL(file);
        }
    }

    getFileObject() {
        return this.refs.input.files[0];
    }

    getFileString() {
        return this.state.imageSrc;
    }

    render() {
        let state = this.state,
            props = defaultProps,
            labelClass  = `uploader ${state.loaded && 'loaded'}`,
            borderColor = state.active ? props.activeColor : props.baseColor,
            iconColor   = state.active
                ? props.activeColor
                : (state.loaded)
                    ? props.overlayColor
                    : props.baseColor,
            hideIcon = state.loaded ? 0 : 1;

        return (
            <label
                className={labelClass}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                style={{outlineColor: borderColor}}>

                <img src={state.isImage ? state.imageSrc : require('assets/img/uploaded.png')} className={state.loaded ? 'loaded' : undefined}/>
                <img style={{ color: iconColor, opacity: hideIcon }} className="icon icon-upload"
                     src={require(`assets/img/upload.png`)} alt=""/>
                <p className="texto gris text-center" style={{opacity:hideIcon}}>Subir Archivo</p>
                <input disabled={this.props.disabled} type="file" accept="/*" onChange={this.onFileChange} ref="input" />

            </label>
        );
    }
}
export default FileUploader
