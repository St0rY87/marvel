class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=45f120260796b942a2a146310a6143aa';

    getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Coudn't fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?orderBy=name&limit=9&offset=215&${this._apiKey}`);
    }
    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }

}

export default MarvelService;
