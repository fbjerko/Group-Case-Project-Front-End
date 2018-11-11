import React from "react";
import LayoutGlobal from "../../components/LayoutGlobal";
import NavbarIndex from "../../components/NavbarUser";
import i18n from "../../i18n";
import Iframe from 'react-iframe'


class Documentation extends React.Component {
    constructor(props){
        super(props);
        this.state={
            lng:i18n.language,
            contentType: ''
          }
          this.changeContent = this.changeContent.bind(this);
    }

    changeContent(contentType) {
        this.setState({
            showContent: contentType
        });
    }

    componentDidMount() {
        i18n.on('languageChanged', this.onLanguageChanged)
        
        }
        onLanguageChanged = (lng)=>{
        this.setState({lng:lng});
        }
    

    render(){
        if (this.state.showContent === "UseCase") {

            return(
                <div>
                    <option onClick= {() => this.changeContent(" ")}>Back</option>
    
    <Iframe url="../static/UseCase.pdf"
            width="115rem"
            height="95rem"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen/>
                </div>
            );
            
        } else  if (this.state.showContent === "PDF2") {

            return(
                <div>
    
    <Iframe url="../static/Arc-experis.pdf"
            width="115rem"
            height="95rem"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen/>
                </div>
            );
        } else  if (this.state.showContent === "PDF3") {

            return(
                <div>
    
    <Iframe url="../static/Admin-Document.pdf"
            width="115rem"
            height="95rem"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen/>
                </div>
            );
        } else  if (this.state.showContent === "PDF4") {

            return(
                <div>
    
    <Iframe url="../static/UseCase.pdf"
            width="115rem"
            height="95rem"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen/>
                </div>
            );
        } else  if (this.state.showContent === "PDF5") {

            return(
                <div>
    
    <Iframe url="../static/UseCase.pdf"
            width="115rem"
            height="95rem"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen/>
                </div>
            );
        } else {
            return (
            <LayoutGlobal>
                <NavbarIndex/>
                <div className="doc-div">
                    <option style={{cursor:"pointer"}} className="btn-doc" onClick= {() => this.changeContent("UseCase")}>User Case</option>
                    <option style={{cursor:"pointer"}} className="btn-doc" onClick= {() => this.changeContent("PDF2")}>API Architecture</option>
                    <option style={{cursor:"pointer"}} className="btn-doc" onClick= {() => this.changeContent("PDF3")}>API-Documentation</option>
                    <option style={{cursor:"pointer"}} className="btn-doc" onClick= {() => this.changeContent("PDF4")}>PDF4</option>
                    <option style={{cursor:"pointer"}} className="btn-doc" onClick= {() => this.changeContent("PDF5")}>PDF5</option>
                </div>

            </LayoutGlobal>


            );

            
        }

 

    }


}


export default Documentation;