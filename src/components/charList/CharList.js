import { Component } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import MarvelService from '../../services/MarvelService';



class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 310,
        charactersEnded: false,
        totalCharachters: 1564,
    }


    marvelService = new MarvelService();



    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        // this.marvelService.getAllCharacters(offset);
        this.fetchData(offset);
    }

    onCharListLoaded = (newCharacters) => {
        const { offset, totalCharachters } = this.state;
        // console.log(this.state.offset);
        let ended = false;
        if (newCharacters.length < 9 || offset + 9 === totalCharachters) {
            ended = true;
        }

        this.setState(({ characters, offset }) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charactersEnded: ended
        }))
    }

    onCharListLoading = () => {
        this.setState(this.setState({
            newItemLoading: true
        }))
    }

    fetchData = async (offset) => {
        try {
            const data = await this.marvelService.getAllCharacters(offset);
            // const totalCharachters = await this.marvelService.getTotal();
            // this.setState({ totalCharachters });
            this.onCharListLoaded(data);
        }
        catch (error) {
            console.error('Error fetching:', error);
        }
    }

    selectedCurrentItem = elem => {
        this.myRef = elem;
    }

    focusOnItem = () => {
        if (this.myRef) {
            this.myRef.focus();
        }
    }
    // handleItemClick = (id) => {
    //     this.focusItem();
    //     this.props.onCharSelected(id)
    // }

    handleItemClick = (id, elem) => {
        this.selectedCurrentItem(elem);
        this.focusOnItem();
        this.props.onCharSelected(id);
    }


    render() {
        const { characters, offset, newItemLoading, charactersEnded } = this.state;
        const characterItems = characters.map(item => {
            const { name, thumbnail, id } = item;
            const refNotAvalibaleIamge = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            let imgStyle = {
                'objectFit': 'cover'
            };
            if (thumbnail === refNotAvalibaleIamge) {
                imgStyle = { 'objectFit': 'unset' };
            }


            return (
                <li className="char__item"
                    ref={this.selectedCurrentItem}
                    tabIndex="0"
                    key={id}
                    onClick={(e) => this.handleItemClick(id, e.currentTarget)}
                    onKeyDown={(e) => e.key === ' ' || e.key === 'Enter' ? (e.preventDefault(), this.handleItemClick(id, e.currentTarget)) : ''}


                // onKeyDown={(e) => {
                //     if (e.key === ' ' || e.key === 'Enter') {
                //         e.preventDefault();
                //         this.handleItemClick(id, e.currentTarget);
                //     }
                // }
                // }
                >

                    <img src={thumbnail} alt="abyss" style={imgStyle} />
                    <div className="char__name">{name}</div>
                </li >
            )
        })
        return (
            <div className="char__list" >
                <ul className="char__grid">
                    {characterItems}
                </ul>
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{ 'display': charactersEnded ? 'none' : 'block' }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;