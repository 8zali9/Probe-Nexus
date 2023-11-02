"use client"

import React, { useState } from "react";
import SearchForm from './components/SearchForm'
import Link from "next/link";
import { toast } from 'react-toastify';
import { GoDownload } from 'react-icons/go';

export default function Home() {
  const [res, setRes] = useState([]);

  const handleUpdate = (data) => {
    setRes(data);
  }

  const handleSaving = async (e, title, snippet, link) => {
    e.preventDefault();

    const linkComponents = { title, snippet, link };

    const response = await fetch('http://localhost:1010/api/probenexus/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(linkComponents),
      next: {
        revalidate: 0
      }
    });

    if (response.status === 201) {
      toast.dark('Saved')
    }
    else {
      toast.error('Error Saving...')
    }
  }

  return (
    <main className="page">
      <SearchForm onUpdate={handleUpdate} />
      {res.map((r) => (
        <li className="links-list" key={r.link}>
          <div className='link-block'>
            <Link className="link-sep" href={r.link}><h4>{r.title}</h4></Link>
            <p className="snippet">{r.snippet}</p>
          </div>
          <form className="form-save" onSubmit={(e) => handleSaving(e, r.title, r.snippet, r.link)}>
            <button className="link-save"><GoDownload/></button>
          </form>
        </li>
      ))}
    </main>
  );
}
