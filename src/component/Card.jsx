const gifs = import.meta.glob('../images/*.gif', { eager: true });

export default function Card({ name, onClick }) {
    const filename = `../images/${name}.gif`;
    const image = gifs[filename];

    return (
    <div className="card" onClick={onClick}>
      <img src={image.default} alt={name} />
    </div>
  );
}
