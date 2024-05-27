class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=45f120260796b942a2a146310a6143aa';
    _baseOffset = 210;
    _totalCharacters = 164;


    getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Bad response ' + res.status)
        }
        else {
            return await res.json();
        }
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?orderBy=name&limit=9&offset=${offset}&${this._apiKey}`);
        // console.log(res);
        return res.data.results.map(item => this._transformCharacter(item));
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    // getTotalCharacters = async () => {
    //     const res = await this.getResource(`${this._apiBase}characters?${this._apiKey}`);
    //     const data = res.data.total;
    //     return await data;
    // }

    getTotalCharacters = () => {
        return this._totalCharacters;
    }



    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items

        }
    }

}

export default MarvelService;
