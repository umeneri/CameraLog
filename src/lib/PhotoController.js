import RNPhotosFramework from 'react-native-photos-framework';

const TITLE = 'cameralog';

class PhotoController {
  async getAlbum() {
    return this.findOrCreateAlbum();
  }

  async findOrCreateAlbum() {
    const result = await this.findAlbum(TITLE);
    console.log(result);
    const albums = result.albums;
    console.log(albums);

    if (albums && albums.length > 0) {
      console.log("album exists");
      return albums[0];
    }

    return await this.createAlbum(TITLE);
  }

  async findAlbum(title) {
    return await RNPhotosFramework.getAlbumsByTitle(title).catch(this.hasError);
  }

  async createAlbum(title) {
    return await RNPhotosFramework.createAlbum(title).catch(this.hasError);
  }

  async createAsset(album, path) {
    const assets = await RNPhotosFramework.createAssets({
      images : [{ uri : path }],
      album : album,
      includeMetadata : true,
    });

    const asset = assets[0];
    const date = Date.now();
    const res = await asset.setCreationDate(date);
    console.log(res);

    return asset;
  }

  async getAlbums() {
    return await RNPhotosFramework.getAlbums({
      type: 'album',
      subType: 'any',
      assetCount: 'exact',
    });
  }

  async getAssets(album) {
    /* return await RNPhotosFramework.getAssets({ */
    /*   startIndex: 0,                           */
    /*   endIndex: 100,                           */
    /*   includeMetadata: true,                   */
    /*   fetchOptions : {                         */
    /*     sourceTypes: ['userLibrary'],          */
    /*     sortDescriptors : [                    */
    /*       {                                    */
    /*         key: 'creationDate',               */
    /*         ascending: true,                   */
    /*       }                                    */
    /*     ]                                      */
    /*   }                                        */
    /* });                                        */

    const response = await album.getAssets({
      startIndex: 0,
      endIndex: 100,
      trackInsertsAndDeletes: true,
      trackChanges: false,
      includeMetadata: true,
    })
    return asset = response.assets;
  }

  hasError(erorr) {
    console.error(error);
    return null;
  }
}

export default new PhotoController();
