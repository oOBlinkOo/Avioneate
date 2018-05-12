export class TripModel {
constructor(id_user,stars,source,destino,sourcePlace,destinoPlace,plaza,foto){
	this.id_user=id_user
    this.stars=stars;
    this.foto=foto;

    this.source = source;
    this.destino = destino;

    this.sourcePlace = sourcePlace;
    this.destinoPlace = destinoPlace;
    
    this.plaza=plaza;
    
}
    id_user:string = null;
    stars:string=null;

    source:string = null;
    sourcePlace:string = null;
    destino:string = null;
    destinoPlace:string = null;
    
    plaza:string=null;
    foto:string=null;
    


}