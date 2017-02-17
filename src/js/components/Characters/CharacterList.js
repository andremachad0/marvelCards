import React from "react";
import Media from "react-bootstrap/lib/Media";
import Config from '../../config/config.js';
import CharactersService from './Characters.service';
import Character from './Character';
import $ from 'jquery';
import ToggleDisplay from 'react-toggle-display';

export default class CharacterList extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.characterClick = this.characterClick.bind(this);
        this.favoriteClick = this.favoriteClick.bind(this);
        this.state = {
            Characters: [],
            favorites: [],
            showFavorites: false
        }
    }

    componentDidMount() {

        var self = this;

        // API endpoint for marvel'
        //TODO: Change fixed values
        var url = 'http://gateway.marvel.com:80/v1/public/characters?apikey=' + "2781c922973d0988ca108757fc9c5374" + '&hash=91d486a3f19df392c2a35fb3cb073538&ts=1487128693289' + "&limit=35" + "&orderBy=-modified";

        $.getJSON(url, function(result) {

            if (!result || !result.data || !result.data.results || !result.data.results.length) {
                return;
            }
            var Characters = result.data.results.map(function(character) {
                return {
                    id: character.id,
                    name: character.name,
                    description: character.description ? character.description : "No description. =(",
                    thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
                    favorite: false
                };
            });
            // console.log(Characters);

            self.onChange({
                Characters: Characters
            });
        });
    }

    characterClick(id) {

        var favorites = this.state.favorites,
            Characters = this.state.Characters;

        for (var i = 0; i < Characters.length; i++) {
            if (Characters[i].id == id) {
                if (Characters[i].favorite) {
                    return this.favoriteClick(id);
                }
                favorites.push(Characters[i]);
                Characters[i].favorite = true;
                break;
            }
        }

        this.onChange({
            Characters: Characters,
            favorites: favorites
        })
    }

    favoriteClick(id) {

        var favorites = this.state.favorites,
            Characters = this.state.Characters;

        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id == id) break;
        }


        favorites.splice(i, 1);

        for (i = 0; i < Characters.length; i++) {
            if (Characters[i].id == id) {
                Characters[i].favorite = false;
                break;
            }
        }

        this.onChange({
            Characters: Characters,
            favorites: favorites
        })
    }

    onChange(state) {
        this.setState(state);
    }

    render() {

        var self = this;

        var Characters = this.state.Characters.map(function(character) {
            return <Character id = {character.id} src = {character.thumbnail} title = {character.name} description = {character.description} favorite = {character.favorite} onClick = {self.characterClick}/>
        });

        if (!Characters.length) {
            Characters = < p > Loading images.. < /p>;
        }

        var favorites = this.state.favorites.map(function(favorite) {
            return <Character id = {favorite.id} src = {favorite.thumbnail} title = {favorite.name} description = {favorite.description} favorite = {true} onClick = {self.favoriteClick} />
        });

        if (!favorites.length) {
            favorites = <p> Click an image to mark it as a favorite. </p>;
        }

        return (
            <div class = "container" style = {{"backgroundColor": "rgba(128, 128, 128, 0.38)", "marginTop": "60px"}} >

                <ToggleDisplay hide={this.state.showFavorites}>
                  <h1 className = "Characters"> Marvel Characters </h1>
                  <div className = "Characters" > {Characters}  < /div>
                </ToggleDisplay>

                <h1> Your favorite characters </h1>
                <div className = "favorites" > {favorites} < /div>

            </div>
        );
    }
}
