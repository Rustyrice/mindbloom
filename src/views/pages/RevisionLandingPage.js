import React from "react";

import RevisionHeader from "components/Headers/RevisionHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";


function RevisionPage(){
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
      document.body.classList.add("revison-page");
      return function cleanup() {
        document.body.classList.remove("revision-page");
      };
    });
    return (
        <>
            <IndexNavbar />
            <RevisionHeader />
        </>
    );
}


export default RevisionPage;