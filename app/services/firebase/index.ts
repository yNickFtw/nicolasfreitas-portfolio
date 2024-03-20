import { IFirebaseService } from '@/app/interfaces/services/IFirebaseService'
import firebaseConfig from '@/app/config/firebase'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { FirebaseStorage, StorageReference, getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage'

export default class FirebaseService implements IFirebaseService {
    firebaseApp: FirebaseApp;
    firebaseStorage: FirebaseStorage;

    constructor() {
        this.firebaseApp = initializeApp(firebaseConfig);
        this.firebaseStorage = getStorage(this.firebaseApp);
    }

    public async uploadImage(filename: string, folder: string, buffer: Buffer, mimetype: string): Promise<string> {
        const storageRef = ref(this.firebaseStorage, `${folder}/${filename}.png`);
        

        await uploadBytes(storageRef, buffer, {
            contentType: mimetype
        })

        const url = await getDownloadURL(storageRef)

        return url;
    }

    public async deleteImage(filename: string, folder: string): Promise<void> {
        const storageRef = ref(this.firebaseStorage, `${folder}/${filename}.png`);


        await deleteObject(storageRef);
        console.log(`Imagem ${filename}.png na pasta ${folder} excluída com sucesso.`);
    }
}