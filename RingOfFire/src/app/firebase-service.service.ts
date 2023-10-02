import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, deleteDoc, where, limit, orderBy } from '@angular/fire/firestore';
import { Game } from './models';


@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  games: Game[] = [];
  myGameId;
  myGameName: string;
  currentGame;

  firestore: Firestore = inject(Firestore);

  unsubGames;

  constructor() { 
  }

  ngonListening(){
    this.unsubGames = this.subGamesList();
  }

  ngonDestroy(){
    this.unsubGames();
  }

  getMyGame(id){
    let g;
    for (let i = 0; i < this.games.length; i++) {
      const element = this.games[i];
      if(element.id == id){
        g = element
        this.currentGame = element
      }
    }
    return g
  }

  joinGame(id){
    if(id){
      this.myGameId = id
      this.games.forEach(element => {
        if(element.id == this.myGameId){
          this.currentGame = element
        }
      });
    }
  }

  async deleteGame(docId:string){
    console.log('delete')
    await deleteDoc(this.getSingleDocRef("games", docId)).catch(
      (err) => {console.error(err)}
    ).then();
  }

  async updateGame(game: Game){
    console.log('update')
    if(game.id){
      let docRef = this.getSingleDocRef('games', game.id);
      await updateDoc(docRef, this.getCleanGame(game)).catch(
        (err) => {console.error(err)}
      ).then();
    }
  }

  getCleanGame(game: Game):{} {
    return {
      name: game.name,
      players: game.players,
      stack: game.stack,
      playedCards: game.playedCards,
      currentPlayer: game.currentPlayer,
      pickCardAnimation: game.pickCardAnimation,
      currentCard: game.currentCard
    }
  }

  async addGame(item: Game, colId: 'games'){
    console.log('add')
    if(colId == 'games'){
      const newGame = await addDoc(this.getGamesRef(), item).catch(
        (err) => {console.error(err)}
      ).then()
    }
  }

  subGame(docId){
    return onSnapshot(this.getSingleDocRef('games', docId), (element) => {
      this.games.push(this.setGameObject(element.data(), element.id));
      console.log('get')
    });
  }

  subGamesList(){
    return onSnapshot(this.getGamesRef(), (list) => {
      this.games= []
      console.log('getList')
      list.forEach(element => {
        this.games.push(this.setGameObject(element.data(), element.id));
      });
    })
  }

  setGameObject(obj, id): Game {
    return {
      id: id,
      name: obj.name || "Game",
      players: obj.players || [""],
      stack: obj.stack || [""],
      playedCards: obj.playedCards || [""],
      currentPlayer: obj.currentPlayer || 0,
      pickCardAnimation: obj.pickCardAnimation || false,
      currentCard: obj.currentCard || "",
    }
  }

  getGamesRef(){
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId, docId){
    return doc(collection(this.firestore, colId), docId);
  }
}
