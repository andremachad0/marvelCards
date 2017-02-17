import React from "react";
import Header from "./Header";
import CharacterList from "./Characters/CharacterList";
// import Footer from "./Footer";

export default class Layout extends React.Component {
    render() {
      return (
        <div>
         <Header/>
         <CharacterList/>
        </div>
      );
    }
}
