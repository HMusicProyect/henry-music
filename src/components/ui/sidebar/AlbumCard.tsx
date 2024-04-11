import Card from './Card';

const AlbumCard = () => {
    //aca podrian llegar por props los datos de cada album 
    return (
        <Card className="w-64">
            <img src="https://ik.imagekit.io/loudcave/wp-content/uploads/2021/05/4ab07de8032ab00b91b04061a687ad00.1000x1000x1.png" alt="Album cover" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-white">Nombre del álbum</h2>
                <p className="text-gray-300">Artista</p>
            </div>
        </Card>
    );
}

export default AlbumCard;