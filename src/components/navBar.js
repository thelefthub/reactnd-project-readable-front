import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

    state = {
        viewChoice: 'home'
    }

    //set state according to view preference (when clicking link)
    onViewChoice = (choice) => {
        this.setState({ viewChoice: choice }, () => {
        });
    }

    render() {
        return(
            <nav className={"navbar " +"navbar-expand-lg "+ "navbar-light" +" bg-light"}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={"collapse "+ "navbar-collapse"} id="navbarSupportedContent">
                <ul className={"navbar-nav " + "mr-auto"}>
                <li className={'nav-item ' + (this.state.viewChoice === 'home' ? 'active' : '')}>
                    <Link className="nav-link" to='/' onClick={(e) => this.onViewChoice('home')}>Home</Link>
                </li>
                {this.props.categories.map((cat) => (
                    <li key={cat.name} className={'nav-item ' + (this.state.viewChoice === cat.name ? 'active' : '')}>
                    <Link className="nav-link" to={`/category/${cat.name}`} onClick={(e) => this.onViewChoice(cat.name)}>{cat.name}</Link>
                    </li>
                ))}
                </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;