import React from 'react';
import './Footer.css'



class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {

        return (
            <footer>
                <a href='https://www.instagram.com/reus_solovey/'><i className="fab fa-instagram social"></i></a>
                <a href='https://github.com/RSoloWay'><i className="fab fa-github social"></i></a>
                <a href='https://www.linkedin.com/in/rost-solovey/'><i className="fab fa-linkedin-in social"></i></a>
            </footer>
        )
    }
}


export default Footer;