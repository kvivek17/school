"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/getschool")
      .then(res => res.json())
      .then(data => setSchools(data));
  }, []);

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Schools</h1>
      <div className="grid gap-6  grid-cols-1 sm:grid-cols-3 md:grid-cols-5 place-items-center">

        {schools.map((school) => (
            <Link key={school.id} href={`/getschool/${school.id}`}>
          <div key={school.id} className="border rounded-lg shadow pt-1  px-1  py-10 w-60 overflow-hidden bg-white hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
            <img src={`${school.image}`} alt={school.name} className="h-50 w-full transition-transform duration-300 hover:scale-110 object-cover rounded-md" />
            <h2 className="text-lg flex justify-center font-bold mt-2">{school.name}</h2>
            <p className="text-gray-600 flex justify-center">{school.address}</p>
            <p className="text-gray-600 font-semibold  flex justify-center">{school.address}</p>

            <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">  View details</button>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
