var TripModel = (function () {
    function TripModel(id_user, stars, source, destino, sourcePlace, destinoPlace, plaza, foto) {
        this.id_user = null;
        this.stars = null;
        this.source = null;
        this.sourcePlace = null;
        this.destino = null;
        this.destinoPlace = null;
        this.plaza = null;
        this.foto = null;
        this.id_user = id_user;
        this.stars = stars;
        this.foto = foto;
        this.source = source;
        this.destino = destino;
        this.sourcePlace = sourcePlace;
        this.destinoPlace = destinoPlace;
        this.plaza = plaza;
    }
    return TripModel;
}());
export { TripModel };
//# sourceMappingURL=TripModel.js.map