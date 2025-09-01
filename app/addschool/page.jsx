"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      // Only append file if it exists
      if (key === "image") {
        if (data.image[0]) formData.append("image", data.image[0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await fetch("/api/addschool", { method: "POST", body: formData });
      const result = await res.json();
      setMessage(result.message || result.error);

      if (res.ok) {
        reset();
        setPreview(null);
      }
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  // Update image preview when a file is selected
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
        <input {...register("name", { required: true })} placeholder="School Name" className="border p-2 rounded-md w-full" />
        {errors.name && <span className="text-red-500">Name required</span>}

        <input {...register("address", { required: true })} placeholder="Address" className="border p-2 rounded-md w-full" />
        {errors.address && <span className="text-red-500">address required</span>}

        <input {...register("city", { required: true })} placeholder="City" className="border p-2 rounded-md w-full" />
        {errors.city && <span className="text-red-500">city required</span>}

        <input {...register("state", { required: true })} placeholder="State" className="border p-2 rounded-md w-full" />
        {errors.state && <span className="text-red-500">state required</span>}


        <input
          type="tel"
          {...register("contact", {
            required: "Contact number is required",
            pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" }
          })}
          placeholder="Contact No"
          className="border p-2 rounded-md w-full"
        />
        {errors.contact && <span className="text-red-500">{errors.contact.message}</span>}


        <input {...register("email_id", { required: "email is required", pattern: { value: /^\S+@\S+$/i, message: "enter valid email" } })} placeholder="Email" className="border p-2 rounded-md w-full" />
        {errors.email_id && <span className="text-red-500">{errors.email_id.message}</span>}


        <input
          type="file"
          {...register("image", { required: true })}
          className="border p-2 w-full"
          onChange={handleImageChange}
        />

        {preview && (
          <div className="mt-2">
            <p className="text-sm">Image Preview:</p>
            <img src={preview} alt="Preview" className="mt-1 w-32 h-32 object-cover border" />
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add School
        </button>
      </form>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
