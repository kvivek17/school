"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SchoolProfile() {
  const { id } = useParams();
  const [school, setSchool] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/getschool?id=${id}`)
        .then((res) => res.json())
        .then((data) => setSchool(data));
    }
  }, [id]);

  if (!school) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-lg shadow-lg mt-5">
      <img 
        src={school.image} 
        alt={school.name} 
        className="w-full h-100 object-cover rounded-lg shadow" 
      />
      <h1 className="text-3xl font-bold mt-4">{school.name}</h1>
      <p className="text-gray-700 mt-2">{school.address}, {school.city}, {school.state}</p>
      <p className="mt-2"><b>Contact:</b> {school.contact}</p>
      <p><b>Email:</b> {school.email_id}</p>
    </div>
  );
}
