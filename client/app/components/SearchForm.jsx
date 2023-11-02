"use client";

import React, { useState } from "react";
import { GoSearch } from 'react-icons/go';

export default function SearchForm( {onUpdate} ) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:1010/api/probenexus/search',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({searchQuery}),
      next: {
        revalidate: 180
      }
    })

    const data = await response.json();
    onUpdate(data);
  }

  return (
    <div className="form-div">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          required
          placeholder="Probe"
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <button className="search-btn" type="submit"><GoSearch/></button>
      </form>
    </div>
  );
}