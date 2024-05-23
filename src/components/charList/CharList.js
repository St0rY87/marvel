import { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';



class CharList extends Component {
    state = {
        characters: []
    }

    marvelService = new MarvelService();
    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const data = await this.marvelService.getAllCharacters();
            console.log(data);
            this.setState({ characters: data });
        }
        catch (error) {
            console.error('Error fetching:', error);
        }
    }


    render() {
        const { characters } = this.state;
        const characterItems = characters.map(item => {
            const { name, thumbnail, id } = item;
            const refNotAvalibaleIamge = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            let imgStyle = { 'objectFit': 'cover' };
            if (thumbnail === refNotAvalibaleIamge) {
                imgStyle = { 'objectFit': 'unset' };
            }


            return (
                <li className="char__item"
                    key={id}
                    onClick={() => this.props.onCharSelected(id)}>
                    <img src={thumbnail} alt="abyss" style={imgStyle} />
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {characterItems}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;