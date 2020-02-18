import React from "react";

function Form({ handleLocation, state, submit }) {
  return (
    <div>
      <form method="post">
        <input
          type="text"
          name="city"
          placeholder="city"
          onChange={handleLocation}
          value={state.location.city}
        />
        <input
          type="text"
          name="country"
          placeholder="country"
          onChange={handleLocation}
          value={state.location.country}
        />
        <button type="submit" onClick={submit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
