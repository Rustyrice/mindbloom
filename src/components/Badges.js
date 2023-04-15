import { Tooltip } from 'react-tooltip'
import { GiRank1, GiRank2, GiRank3 } from "react-icons/gi";

function Badges({ points }) {

  return (
    <div style={{width: "100%",display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gridGap: "10px"}}>
        <GiRank1 size="4em" style={{justifySelf: "center"}} title="You earn this badge by completing 300 tasks!"/>
        <GiRank2 size="4em" style={{justifySelf: "center"}} title="You earn this badge by completing 1,000 tasks!"/>
        <GiRank3 size="4em" style={{justifySelf: "center"}} title="You earn this badge by completing 10,000 tasks!"/>

        <h3 style={{justifySelf: "center"}}>{parseInt(points / 300)}</h3>
        <h3 style={{justifySelf: "center"}}>{parseInt(points / 1000)}</h3>
        <h3 style={{justifySelf: "center"}}>{parseInt(points / 10000)}</h3>
    </div>
  );
}

export default Badges;