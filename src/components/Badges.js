import { GiRank1, GiRank2, GiRank3 } from "react-icons/gi";

function Badges({ points }) {

  return (
    <div style={{width: "100%",display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gridGap: "10px"}}>
        <h3 style={{justifySelf: "center"}}>Private</h3>
        <h3 style={{justifySelf: "center"}}>Corporal</h3>
        <h3 style={{justifySelf: "center"}}>Commander</h3>
        <GiRank1 size="4em" style={{justifySelf: "center"}} title="You earn this badge by having 500 points!"/>
        <GiRank2 size="4em" style={{justifySelf: "center"}} title="You earn this badge by having 1,000 points!"/>
        <GiRank3 size="4em" style={{justifySelf: "center"}} title="You earn this badge by having 10,000 points!"/>
        <h3 style={{justifySelf: "center"}}>{parseInt(points / 500)}</h3>
        <h3 style={{justifySelf: "center"}}>{parseInt(points / 1000)}</h3>
        <h3 style={{justifySelf: "center"}}>{parseInt(points / 10000)}</h3>
    </div>
  );
}

export default Badges;