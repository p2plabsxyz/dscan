import copyIcon from "../assets/copy.svg";
import upRightFromSquare from "../assets/box-arrow-up-right.svg";

function Output() {
  return (
    <>
      <section className="center">
        <label htmlFor="cid" className="output-label">
          CID:{" "}
        </label>
        <div type="text" id="cid"></div>
        <img src={copyIcon} alt="Copy Icon" />
        <div id="tooltip">
          <div>COPIED</div>
        </div>
        <div id="tooltip-pointer"></div>
      </section>
      <section className="center">
        <label htmlFor="link" className="output-label">
          URI:{" "}
        </label>
        <div id="link"></div>
        <img src={upRightFromSquare} alt="Up Right From Square" />
      </section>
    </>
  );
}

export default Output;
