const Muistiinpano = ({ item, deleter }) => {
  const suicide = (_e) => {
    deleter(item);
  };
  return (
    <div className="MuistiinpanoDiv">
      <div className="MuistiinpanoCloseButton" onClick={suicide}></div>
      <ul>
        <li key={item.id}>
          <b>{item.course.name} ({item.course.id})</b> {item.timestamp}
        </li>
          <p>{item.text}</p>
      </ul>
    </div>
  );
};

export default Muistiinpano;
