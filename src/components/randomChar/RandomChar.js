import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {


    state = {
        char: {},
        loading: true,
        error: false,
        charId: Math.floor(Math.random() * (1011050 - 1011000) + 1011000)
    }


    marvelService = new MarvelService();

    componentDidMount() {
        // console.log('componentDidMount');
        this.updateChar();
    }

    componentWillUnmount() {
        // console.log('componentWillUnmount');
    }


    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,   //char: char
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }


    updateChar = () => {
        this.setState({
            charId: Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        })
        // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        console.log(this.state.charId);
        this.onCharLoading();
        this.marvelService
            .getCharacter(this.state.charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    handleError = () => {
        console.log('error');
        this.setState({
            charId: 1011329,
            error: false
        })
    }


    render() {
        console.log('render');
        const { char, loading, error } = this.state;
        const errorMessage = error ? this.handleError() : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    const refNotAvalibaleIamge = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    let nameOfClassImage = '';
    if (thumbnail === refNotAvalibaleIamge) {
        nameOfClassImage = 'randomchar__not-avaliable';
    }
    else {
        nameOfClassImage = "randomchar__img";
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={nameOfClassImage} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;