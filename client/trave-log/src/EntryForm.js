import React, { useState } from "react";

import "./App.css";
import { createLogs } from "./api";
import { useForm } from "react-hook-form";

const EntryForm = ({ location, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      data.latitude = location.latitude;
      data.longitude = location.longitude;

      const created = await createLogs(data);
      console.log("created Entry", created);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className={"error"}>{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register} />

      <label htmlFor="apiKey">API KEY</label>
      <input name="apiKey" required ref={register} type="password" />

      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} ref={register}></textarea>

      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} ref={register}></textarea>

      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />

      <label htmlFor="dateVisited">Date Visited</label>
      <input name="dateVisited" type="date" required ref={register} />

      <button disabled={loading}>
        {loading ? "loading..." : "Create Entry"}
      </button>
    </form>
  );
};

export default EntryForm;
