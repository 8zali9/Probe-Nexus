"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { RiDeleteBin4Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';

export default function myItems() {
  const router = useRouter()

  const [savedItems, setSavedItems] = useState([]);

  async function fetchItems() {
    const response = await fetch('http://localhost:1010/api/probenexus/my-items', {
      next: {
        revalidate: 0
      }
    }
    );
    const items = await response.json();
    return items.result;
  }

  const handleRemoving = async (itemID) => {
    const response = await fetch(`http://localhost:1010/api/probenexus/${itemID}`, {
      method: "DELETE",
      next: {
        revalidate: 0
      }
    });

    if (response.status === 200) {
      setSavedItems(savedItems.filter(item => item._id !== itemID))
      router.refresh()
      toast.dark('Removed')
    }
    else {
      toast.error('Error removing...')
    }
  }

  const handleRemoveAll = async () => {
    const response = await fetch('http://localhost:1010/api/probenexus/',{
      method: "DELETE",
    })

    if (response.status === 200) {
      setSavedItems([]);
      router.refresh()
      toast.dark('Removed All Items')
    }
    else {
      toast.error('Error removing items...')
    }
  }

  useEffect(() => {
    async function fetchData() {
      const items = await fetchItems();
      setSavedItems(items);
    }

    fetchData();
  }, []);

  return (
    <div className="saved-items">
      <p className='saved-head'>Saved Links</p>
      <form className="form-removeall" onSubmit={(e) => { e.preventDefault(); handleRemoveAll(); }}>
        <button type='submit' className="link-removeAll">Remove All Items</button>
      </form>
      {savedItems.map((r) => (
        <li className="links-list" key={r.link}>
          <div className='link-block'>
            <a className="link-sep" href={r.link}><h4>{r.title}</h4></a>
            <p className="snippet">{r.snippet}</p>
          </div>
          <form className="form-save" onSubmit={(e) => { e.preventDefault(); handleRemoving(r._id); }}>
            <button type='submit' className="link-save"><RiDeleteBin4Fill/></button>
          </form>
        </li>
      ))}
    </div>
  );
}