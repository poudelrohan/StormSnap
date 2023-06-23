import React from "react";

const Inputt = ({ handleSearch, setLocation }) => {
  return (
    <div className="search-container">
      <form action="">
        <input
          type="text"
          placeholder="Search City"
          name="search"
          onKeyDown={handleSearch}
          onChange={(e) => setLocation(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Inputt;
